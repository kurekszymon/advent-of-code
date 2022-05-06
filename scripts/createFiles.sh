#!/bin/bash

YEAR=$1
mkdir $YEAR
for i in {1..24}; do mkdir $YEAR/$i && echo "" >  $YEAR/$i/$i.js && echo "" > $YEAR/$i/$i.txt; done 