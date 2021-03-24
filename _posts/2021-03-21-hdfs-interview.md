---
layout: post
title:  "Interview - HDFS"
date:   2021-03-21
desc: "Interview preparation on HDFS"
keywords: "HDFS, Interview"
categories: [Work]
tags: [Interview,HDFS]
icon: icon-cloud
---

Hadoop Distributed File System - HDFS, is a distributed files system that allows big data to be stored across multiple nodes.

Yarn is the resource management in hadoop that allows multiple processing engines to manage data in a single platform.



- Key Features of HDFS

  - Scalable: HDFS is generally deployed on cloud, which one can easilyt scale the cluster by adding more nodes
  - Variety of Data: HDFS supports structured and un-structured data
  - Reliability: data is divided into data blocks, and are stored in a disctributed fashion across the Hadoop cluster
  - Processing speed: because of the nature of distributed syste, hadoop can provide high throughput (amount of data processed in unit time) access to applicataion data; 
  - Write once read many; once the data is written, it can not be modified, this solved the data coherency issue

- HDFS Architecture: (Master-slave)

  ![Apache Hadoop HDFS Architecture - Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2013/05/Apache-Hadoop-HDFS-Architecture-Edureka.png)

  - NameNode: the master daemon that maintains and manages the data present in DataNodes, records metadata about files stored; requires higher **RAM** for high availability 
  - DataNode: slave nodes, responsibile for storing data as blocks, require higher **Disk** for storage;
    - DataNode send hearbeat event to NameNode indicating it's working properly
  - Seconday NameNode: helper daemon, works concurrently with NameNode, performs checkpoint (combine edit-log and file system image to update the file system and prevent the edit-log to become too large); this is not a back up or subsititue to the NameNode
    - FsImage: the complete state of the file system namespace since the start of the NameMode
    - EditLogs: all the recent modification to the file system

- RDBMS vs Hadoop

  |                                  | RDBMS                                                        | HDFS                                                         |
  | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | **Data Types**                   | RDBMS relies on the structured data and the schema of the data is always known. | Any kind of data can be stored into Hadoop i.e. Be it structured, unstructured or semi-structured. |
  | **Processing**                   | RDBMS provides limited or no processing capabilities.        | Hadoop allows us to process the data which is distributed across the cluster in a parallel fashion. |
  | **Schema on** **Read Vs. Write** | RDBMS is based on ‘schema on write’ where schema validation is done before loading the data. | On the contrary, Hadoop follows the schema on read policy.   |
  | **Read/Write Speed**             | In RDBMS, reads are fast because the schema of the data is already known. | The writes are fast in HDFS because no schema validation happens during HDFS write. |
  | **Cost**                         | Licensed software, therefore, I have to pay for the software. | Hadoop is an open source framework. So, I don’t need to pay for the software. |
  | **Best Fit Use Case**            | RDBMS is used for OLTP (Online Trasanctional Processing) system. | Hadoop is used for Data discovery, data analytics or OLAP system. |

- Problem with Small Files:

  - Each small file will take up 150 bytes in memory to store it's metadata, too much RAM is not cost-efficient;
  - Reading is not efficient, as there are lots of seek and jump from datanode to datanode

- Block: these are the smallest continuous location on the hard drive where data is stored, hdfs store each files as blocks and distributed it across the hadoop cluster; by default it's size is 128 MB

  ![HDFS ARCHITECTURE](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2016/10/HDFS-File-Block-Apache-Hadoop-HDFS-Architecture-Edureka-528x91.png)

- Replication: blocks of data are also replicated to provide fault tolerance, so even when a DataNode fails or a data block gets corrupted, the data can still be retrieved

  - Rack Awareness: this is an algorithm to make sure that not all the replica of a blcok are stored on the same rack or a single rack. 

- HDFS Write: 

  - Client reachout to NameNode for request to writting to two blocks

  - NameNode gives a list of IP adress for the DataNode (all replicates)

  - The block will also be copied to these three DataNodes

    ![HDFS Pipeline Set Up](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2016/11/HDFS-Pipeline-Set-up-Apache-Hadoop-HDFS-Architecture-Edureka-1.png)

![HDFS Write](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2016/11/HDFS-Write-Apache-Hadoop-HDFS-Architecture-Edureka-1.png)

![HDFS Write Acknowledgement ](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2016/11/HDFS-Write-Acknowledgement-Apache-Hadoop-HDFS-Architecture-Edureka-1.png)

