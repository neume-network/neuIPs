---
neuIP: 5
title: Schema Definition and Identification using Avro
description: A method using Avro schemas to define and identify datasets within a decentralized network.
author: Kevin Neaton <kevin@neaton.xyz>
discussions-to: TBD
status: Draft
created: 2023-05-20
---

## Abstract

This NeuIP proposes a standard for defining, identifying, and validating
schemas in Neume using Apache Avro. This proposal introduces schemas as
defining sets, each with a unique deterministic schema identifier. These
identifiers play a crucial role in facilitating efficient subset reconciliation
within Neume's decentralized network. The proposed standard supports improved
data partitioning, dataset reconciliation, and execution orchestration,
aligning with the vision of Neume as a credibly neutral network of
decentralized nodes collaborating to produce a shared dataset.

## Motivation

The motivation for this proposal is multifaceted, with the overarching
objective of catalyzing Neume's evolution into a network, while serving the
needs of a variety of applications and coping with the full scale of the data
we hope to consume. To realize this vision, we require a robust mechanism to
accurately identify and validate data subsets and coordinate in a decentralized
environment.

At present, Neume lacks a deterministic methodology for identifying subsets and
their schemas, making subset partitioning and reconciliation a challenge.
Further, the project lacks an automatic method for optimizing and scheduling
the execution of multiple strategies based on their input and output datasets.
By introducing deterministic Schema Identifiers, this proposal provides a
promising path to address these challenges and to tackle the escalating
scale of data consumed by Neume.

This NeuIP addresses these limitations by proposing Avro-based schema
definitions paired with deterministic identifiers. By using these identifiers,
Neume nodes will be able to coordinate set reconciliation, validate candidate
data against their schemas, orchestrate execution graphs based on their input
and output datasets, and assemble ad-hoc strategy combinations for producing
required output sets. In essence, deterministic Schema Identifiers are a
crucial facilitator for Neume to scale efficiently, supporting flexible dataset
partitioning and segmentation of the Neume schema into numerous, potentially
overlapping, sub-schemas.

The benefits of this proposal align with the principles of social scalability,
and decentralization, integral to the Neume project. Through the introduction
of Avro-based schema definitions and deterministic identifiers, we create a
foundation for a network of independent nodes each operating on subsets of
interest, while fostering Neume’s growth as a network. Thus, this NeuIP is the
first step towards realizing this vision for Neume.

## Specification

TODO

## Rationale

Avro has been selected as the basis for schema definition, identification,
comparison, and normalization due to its expressiveness, rich data modeling
capabilities, and built-in mechanisms for schema resolution and normalization.
In contrast, other alternatives such as JSON Schema and Protocol Buffers lack
specific features such as a well-defined canonical form and sophisticated
schema resolution, making Avro the optimal choice for our needs.

### Schema Definition

Avro’s range of simple and complex data types, from numerics to unions, arrays,
and maps allow for versatile data modeling. Additionally, Avro’s Logical Types
allow for application-specific handling of certain data types.

Among the alternatives, JSON Schema and Protocol Buffers were also considered.
While both offer a range of types and structures for data modeling, neither
provide the level of detailed type specification offered by Avro's logical
types.

### Schema Identification

Avro's Parsing Canonical Form (PCF) serves as a crucial component in ensuring
deterministic schema identification. With PCF, we can consistently hash schema
representations into unique identifiers. This unique, deterministic identifier
is critical for our peer-to-peer network model, where distinct schemas should
consistently generate distinct identifiers.

In comparison, JSON Schema lacks a well-defined canonical form, which would
have made schema identification via hashing unreliable. Protocol Buffers,
although offering deterministic serialization, do not explicitly provide a
mechanism for canonical schema representation.

### Schema Validation

TODO

## Backwards Compatibility

TODO

## Reference Implementation

TODO

## Security Considerations

TODO

## Copyright

Copyright and related rights waived via [CC0](../LICENSE.md).
