---
layout: post
title:  "Interview - Design a Data Pipeline"
date:   2021-03-21
desc: "Interview preparation on System Design for Data Pipeline"
keywords: "Data Pipeline, Interview, Data Engineer"
categories: [Work]
tags: [Interview,System Design]
icon: icon-cloud
---
Functional Requirement: 

1. Scalable - easy to ingest new data source, and easy to add new etl job
2. Maintainable - easy to iterate job, and update configurations
3. Reliable - data quality check, and alerting + monitoring

## Architecture

- Use Airflow to Orchestrate
- Either deploy our own Spark (for MapReduce) on YARN (using AWS EMR) or choose a managed spark service like Azure or Databricks
- Our end table can be stored in a managed NoSQL, this provides better big data storeage functionality compared to a traditional RDBMS; or we can use Hive over HDFS to build our data warehouse

## Layered Data Pipeline



- Data Source
  - Batch - Identify possible API or data source location, liek s3 bucket, Google Storage etc. 
  - Stream - set up kafka , potentially using a managed cloud service, like AWS MSK
- Data Ingestion - Raw Data
  - Python Request library to get the source data; perform basic (like data type clean up) using pandas dataframe
  - Spark Streaming API - scalable, high-throughput, fault-tolerant, based on its natrue of being a distributed computing system, this will integrate with our Kafka data source easily
- Transformation
  - Spark to do the transformation, choice of programming language can be but not limited to Scala, Python, or Java 
    - if we decide to use the K8s operator from Airflow, we can run our image in any environment
  - Most of the MapReduce process
  - Based on the business need, we should target for msot reusable in-between tables
    - Data Modeling is gonna take place
    - User Profile table
    - Marketing table 
- Target Data Modeling
  - If we model our in-between tables really well, this step should be relatively easy. We can easily grab the necessary fields and dimensions from our in between tables, and join them together; if we are targeting to perform advanced data analyisis or ML, we can utilize Spark ML package or setup connection between HDFS and Tensorflow.
  - Some possible use case for the end result
    - Export our data to TensorFlow for ML
    - Export data to some BI, Looker (this require setup a connection, define view and models), or to Tableau (conenction adn tableau refresh)
    - In-house Data Delivery system - daily email, or summary chart, spreadsheet to a Slack channel
- Data Quality Check
  - After each step of Data Ingestion, Data Transformation, we should define some metrics for data quality check
    - Id can not be null
    - Revenue must be positive
    - Transaction number falls in 1.5 std of the historical mean
    - Country code should be alpha2 code
    - Stock ticker should be string data type, upper case
  - Alerting system
    - We should integate this with our Airflow
      - Airflow manage the dependency, and manage the SLA for each task
      - Airflow should also output log to ElasticSearch (full text index database system), so we can quickly identify issue with Kibana
      - Many options in the market for alerting - pagerDuty, where we have a on-call schedule, and higher prioirty failure will be handled immediately. 