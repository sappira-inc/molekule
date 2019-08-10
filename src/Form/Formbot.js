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
    validationSchema: PropTypes.oneOfType([PropTypes.shape(), PropTypes.func]),
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
    const schema = typeof validationSchema === 'function' ? validationSchema(this.getContext()) : validationSchema;

    return Object.keys(schema || validations || {});
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

  setStateErrors = (field, error, cb) =>
    this.setState(
      state => ({
        ...state,
        errors: {
          ...state.errors,
          [field]: error,
        },
      }),
      cb
    );

  validateField(field) {
    return new Promise(resolve => {
      const fieldState = this.state.fields[field] || {};
      if (fieldState.validated) {
        resolve();
        return;
      }

      const { validationSchema, validations } = this.props;

      const fromSchema = !!validationSchema;
      const schema = typeof validationSchema === 'function' ? validationSchema(this.getContext()) : validationSchema;
      const validation = (schema || validations || {})[field];

      if (!validation) {
        resolve();
        return;
      }

      const fieldValue = this.state.values[field];
      let errorMsg;

      try {
        if (fromSchema) {
          if (typeof validationSchema === 'function') {
            validation.validate(fieldValue).catch(e => {
              this.setStateErrors(field, e.message, resolve);
            });

            return;
          }

          validation.validateSync(fieldValue);
        } else if (typeof validation === 'function') {
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
        if (fromSchema) {
          errorMsg = err.errors.length ? err.errors[0] : undefined;
        } else {
          errorMsg = err.message;
        }
      } finally {
        this.updateField(field, { validated: true }).then(() => {
          this.setStateErrors(field, errorMsg, resolve);
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
        this.props.onChange(field, value, this.state.values);
        this.updateField(field, { validated: false }).then(() => {
          this.validateField(field);
        });
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
