#!/bin/sh
grunt build
docker build -t blang/hornetweb .
