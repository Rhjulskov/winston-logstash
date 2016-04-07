// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by winston-logstash.js.
import { name as packageName } from "meteor/winston-logstash";

// Write your tests here!
// Here is an example.
Tinytest.add('winston-logstash - example', function (test) {
  test.equal(packageName, "winston-logstash");
});
