import React from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext(null);

const VALIDATIONS = {
  required: (val, isRequired) => {
    if (!isRequired) return;
    if (!val || (typeof val === 'string' && val === '')) {
      throw new Error('This field is required');
    }
  },
  minLength: (val, minLength) => {
    if (!val || `${val}`.length < minLength) {
      throw new Error(`This field must be at least ${minLength} characters`);
    }
  },
  maxLength: (val, maxLength) => {
    if (val && `${val}`.length > maxLength) {
      throw new Error(`This field cannot be more than ${maxLength} characters`);
    }
  },
};

export default class Formbot extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape(),
    validations: PropTypes.shape(),
    validationSchema: PropTypes.shape(),
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    initialValues: {},
    validations: {},
    validationSchema: null,
    onFocus() {},
    onChange() {},
    onBlur() {},
    onSubmit() {},
  };

  state = {
    values: this.props.initialValues || {},
    fields: {},
    errors: {},
  };

  get validatableFields() {
    const { validationSchema, validations } = this.props;

    return Object.keys(validationSchema || validations || {});
  }

  get validatable() {
    return !!this.validatableFields.length;
  }

  get isValid() {
    return Object.values(this.state.errors).every(val => !val);
  }

  get values() {
    return this.state.values;
  }

  getValues() {
    return this.validateAllFields().then(() => ({
      isValid: this.isValid,
      values: this.values,
    }));
  }

  setValues(values = {}) {
    this.setState(
      {
        values: {
          ...this.state.values,
          ...values,
        },
      },
      this.validateAllFields
    );
  }

  setErrors = (errors = {}, cb) =>
    this.setState(
      state => ({
        errors: {
          ...state.errors,
          ...errors,
        },
      }),
      cb
    );

  updateField(field, updates = {}) {
    return new Promise(resolve => {
      const fieldState = this.state.fields[field] || {};

      this.setState(
        {
          fields: {
            ...this.state.fields,
            [field]: {
              ...fieldState,
              ...updates,
            },
          },
        },
        resolve
      );
    });
  }

  reset = () => {
    this.setState({
      values: {},
      fields: {},
      errors: {},
    });
  };

  validateField(field) {
    return new Promise(resolve => {
      const fieldState = this.state.fields[field] || {};
      if (fieldState.validated) {
        resolve();
        return;
      }

      const { validationSchema, validations } = this.props;

      const hasSchema = !!validationSchema;

      const validation = (validationSchema || validations || {})[field];
      const validationOpts = { context: this.getContext() };

      if (!validation) {
        resolve();
        return;
      }

      const fieldValue = this.state.values[field];
      let errorMsg;

      if (hasSchema && typeof validation.validate === 'function') {
        validation.validate(fieldValue, validationOpts)
          .catch(e => {
            errorMsg = e.message;
          })
          .finally(() => {
            this.updateField(field, { validated: true }).then(() => {
              this.setErrors({ [field]: errorMsg }, resolve);
            });
          })

        return;
      }

      try {
        if (typeof validation === 'function') {
          validation(fieldValue);
        } else {
          Object.keys(validation).forEach(method => {
            const validator = VALIDATIONS[method];

            if (!validator) {
              throw new Error(`Formbot: "${method}" is not a built-in validator.`);
            }

            validator(fieldValue, validation[method]);
          });
        }
      } catch (err) {
        errorMsg = err.message;
      } finally {
        this.updateField(field, { validated: true }).then(() => {
          this.setErrors({ [field]: errorMsg }, resolve);
        });
      }
    });
  }

  validateAllFields() {
    return Promise.all(
      this.validatableFields.map(field =>
        this.updateField(field, { validated: false }).then(() => this.validateField(field))
      )
    );
  }

  onFocus = field => {
    this.updateField(field, { focused: true }).then(() => {
      this.props.onFocus(field);
    });
  };

  onChange = (field, value) => {
    this.setState(
      {
        values: {
          ...this.state.values,
          [field]: value,
        },
      },
      () => {
        this.updateField(field, { validated: false })
          .then(() => this.validateField(field))
          .then(() => this.props.onChange(field, value, this.state.values))
      }
    );
  };

  onBlur = field => {
    this.updateField(field, { blurred: true })
      .then(() => this.validateField(field))
      .then(() => {
        this.props.onBlur(field);
      });
  };

  onSubmit = event => {
    event.preventDefault();

    this.validateAllFields().then(() => {
      this.props.onSubmit({
        isValid: this.isValid,
        values: this.state.values,
        errors: this.state.errors,
      });
    });
  };

  getContext() {
    return {
      ...this.props,
      values: this.state.values,
      errors: this.state.errors,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onSubmit: this.onSubmit,
      reset: this.reset,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <Context.Provider value={this.getContext()}>
        {typeof children === 'function' ? children(this.getContext()) : children}
      </Context.Provider>
    );
  }
}
