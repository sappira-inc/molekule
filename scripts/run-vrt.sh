#!/bin/bash
if [ "${TRAVIS_BRANCH}" != "master" ];
then
  npm test:vrt:ci
else
  # We know any changes that make it to master *must* have been approved
  npm test:vrt:ci --auto-accept-changes
fi