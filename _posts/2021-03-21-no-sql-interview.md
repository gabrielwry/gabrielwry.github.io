---
layout: post
title:  "Interview - NoSql"
date:   2021-03-21
desc: "Interview preparation on NoSql"
keywords: "NoSQL, Interview"
categories: [Work]
tags: [Interview,NoSql]
icon: icon-cloud
---

1. NoSql is a concept when the data is models not using tabular relations used in relational database. NoSql provides simplicitiy of design, simpler horizontabl scaling, but lost the ability to perform some operations fast (like joining, or constraint)
2. NoSql should be used,
   1. when storage is prefered over functionality.
   2. when the relationship between the data is not important
   3. the data is growing continuously
   4. support of join and constriants are not required at the database level
3. Architecture Patterns of NoSql:
   1. Key-Value Store: data stored in form of key-value pairs, typically in a Hash Table; **DynamoDb**
      1. Handle large amounts of data and heavy load
      2. Eay retieval
      3. Many-to-many relationship may collide
      4. Multiple kv pair may delay performance
   2. Columnar: data are stored in columns instead of rows (each column, instead rows, are stored in one or more contiguous blocks); **BigQuery, Cassnadra, Redshift, Snowflake** 
      1. Fits OLAP, that is not focusing on one specific record, but the property of all the records as a whole
      2. Doesn't fit Transaction
   3. Document Database: like key-value pair, each row is a document, collection of a document can be considered as a table; **MongoDb**
   4. Graph Database: map row to nodes, relationship managed by Edge; 

