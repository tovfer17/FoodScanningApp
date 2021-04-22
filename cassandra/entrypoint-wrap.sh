#!/bin/bash

if [[ ! -z "$CASSANDRA_KEYSPACE" && $1 = 'cassandra' ]]; then
  # Create default keyspace for single node cluster
  CQL="CREATE KEYSPACE IF NOT EXISTS $CASSANDRA_KEYSPACE WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};"
  CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.folder(foods list<int>, name text);"
  CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.social_info(user_id int, state text);"
  CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.calorie_tracker(tracker_id int, food_id int, serving_size float, consumption_timestamp timestamp);"
  CQL+="CREATE TABLE IF NOT EXISTS $CASSANDRA_KEYSPACE.users
      (
        id int,
        first_name text,
        last_name text,
        email text,
        favorites frozen<folder>,
        followers list<frozen<social_info>>,
        following list<frozen<social_info>>,
        calorie_tracker list<frozen<calorie_tracker>>,
        state text,
        timestamp timestamp,
        PRIMARY KEY (id, timestamp)
      ) WITH CLUSTERING ORDER BY (timestamp DESC);"
  CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.nutrients
        (
          fat int,
          saturated_fat int,
          trans_fat int,
          cholesterol int,
          sodium int,
          carbohydrates int,
          fiber int,
          sguars int,
          protein int,
          calcium int,
          iron int,
          potassium int,
          calories int
        );"
  CQL+="CREATE TABLE IF NOT EXISTS $CASSANDRA_KEYSPACE.foods
        (
          id bigint,
          name text,
          ingredients text,
          serving_size int,
          serving_size_unit text,
          label_nutrients frozen<nutrients>,
          PRIMARY KEY (id)
        );
  "
  CQL+="CREATE TABLE IF NOT EXISTS $CASSANDRA_KEYSPACE.stores
        (
          id int,
          longitude bigint,
          latitude bigint,
          items list<bigint>,
          PRIMARY KEY (id)
        );"
  until echo $CQL | cqlsh; do
    echo "cqlsh: Cassandra is unavailable - retry later"
    sleep 2
  done &
fi

exec /docker-entrypoint.sh "$@"