# humuhumu-client
react (flux) simple voting button system

## Install
```
$ npm install
```

## Run
```
$ gulp
```
[note]Please do it after installation with local or global so that the gulp command can be executed.

## Useage
### Voting method
Open vote.html

You can vote by setting the group and name by passing the GET parameter.

GET parameter specification

- GroupId: Group No. Segment voting.

* name: Name. Set the name displayed on the voting button

###Voting tabulation
Open count.html

Pass the GET parameter to set the group and name and count up.

GET parameter specification

- groupId: Specify group No. to count up.
- name: Set the name to be displayed

* The count reset function is put in the count screen.
