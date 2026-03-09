---
title: "Spark Concepts Interview Guide"
date: "2021-03-19"
tags: ["spark", "interview", "big-data"]
excerpt: "Essential Apache Spark concepts and questions commonly asked in technical interviews."
---

# Spark Concepts Interview Guide

A collection of important Spark concepts that frequently appear in data engineering interviews.

## Core Concepts

### RDD (Resilient Distributed Dataset)

RDDs are the fundamental data structure in Spark:

- **Immutable** - Once created, cannot be changed
- **Distributed** - Partitioned across cluster nodes
- **Fault-tolerant** - Can be reconstructed from lineage

**Transformations vs Actions:**

```scala
// Transformations (lazy)
val rdd2 = rdd1.map(x => x * 2)
val rdd3 = rdd2.filter(x => x > 10)

// Actions (trigger execution)
rdd3.collect()
rdd3.count()
```

### DataFrame API

DataFrames provide a higher-level abstraction:

```python
# Create DataFrame
df = spark.read.csv("data.csv", header=True)

# Transformations
result = df.select("name", "age") \
          .filter(col("age") > 21) \
          .groupBy("city") \
          .count()
```

## Performance Optimization

### 1. Partitioning

Proper partitioning is crucial for performance:

```python
# Repartition based on key
df.repartition(100, "user_id")

# Coalesce (reduce partitions without shuffle)
df.coalesce(10)
```

### 2. Caching

Cache intermediate results used multiple times:

```python
df.cache()  # or df.persist()
```

### 3. Broadcast Variables

For small lookup tables:

```python
broadcast_var = spark.sparkContext.broadcast(lookup_dict)
```

## Common Interview Questions

### Q: What's the difference between `map()` and `flatMap()`?

- `map()`: One-to-one transformation
- `flatMap()`: One-to-many transformation

```python
# map: [1,2,3] -> [[1,1], [2,2], [3,3]]
rdd.map(lambda x: [x, x])

# flatMap: [1,2,3] -> [1,1,2,2,3,3]
rdd.flatMap(lambda x: [x, x])
```

### Q: Explain Spark's execution model

1. **Job** - Triggered by an action
2. **Stage** - Set of tasks that can run in parallel
3. **Task** - Unit of work on one partition

### Q: What are narrow vs wide transformations?

- **Narrow**: Data from one partition goes to at most one partition (map, filter)
- **Wide**: Data from one partition can go to multiple partitions (groupBy, join)

## Tips for Success

1. Understand the fundamentals (RDD, DataFrame, Dataset)
2. Know performance optimization techniques
3. Practice with real datasets
4. Understand the difference between batch and streaming
5. Be familiar with cluster managers (YARN, Mesos, Kubernetes)

---

*Good luck with your interviews!*
