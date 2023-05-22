---
neuIP: 5
title: Subset Schema Definition and Identification using JSON Schema and JCS
description: A method using JSON Schema and JCS to define and identify datasets within a decentralized network.
author: Kevin Neaton <kevin@neaton.xyz>
discussions-to: TBD
status: Draft
created: 2023-05-22
---

## Abstract

This NeuIP proposes a standard for defining, identifying, validating, and
deriving subset schemas in Neume using JSON Schema and the JSON
Canonicalization Scheme (JCS). This proposal introduces schemas as defining
sets, each with a unique deterministic schema identifier. These identifiers
play a crucial role in facilitating efficient subset reconciliation within
Neume's decentralized network. The proposed standard supports improved data
partitioning, dataset reconciliation, and execution orchestration, aligning
with the vision of Neume as a credibly neutral network of decentralized nodes
collaborating to produce a shared dataset.

## Motivation

The motivation for this proposal is multifaceted, with the overarching
objective of catalyzing Neume's evolution into a network, while serving the
needs of a variety of applications and coping with the scale of the data we
need in order to do so. To realize this vision, we require a robust mechanism
to accurately identify and validate data subsets in a decentralized
environment.

At present, Neume lacks a deterministic methodology for identifying subsets and
their schemas, making subset partitioning and reconciliation a challenge.
Further, the project lacks an automatic method for optimizing and scheduling
the execution of multiple strategies based on their input and output datasets.
By introducing deterministic Schema Identifiers, this proposal provides a
promising path to address these challenges and to tackle the escalating scale
of data consumed by Neume.

This NeuIP addresses these limitations by proposing JSON Schema-based
definitions, validations, derivations paired with deterministic identifiers
using JCS. By using these identifiers, Neume nodes will be able to coordinate
set reconciliation, validate candidate data against their schemas, orchestrate
execution graphs based on their input and output datasets, and assemble ad-hoc
strategy combinations for producing required output sets. In essence,
deterministic Schema Identifiers are a crucial facilitator for Neume to scale
efficiently, supporting flexible dataset partitioning and segmentation of the
Neume schema into numerous, potentially overlapping, sub-schemas.

The benefits of this proposal align with the principles of social scalability,
and decentralization, integral to the Neume project. Through the introduction
of JSON Schema-based definitions, validations, derivations, and deterministic
identifiers using JCS, we create a foundation for a network of independent
nodes each operating on subsets of interest, while fostering Neume’s growth as
a network. Thus, this NeuIP is the first step towards realizing our vision for
Neume.

## Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”,
“SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be
interpreted as described in RFC 2119.

### 1. Schema
#### 1.1 Schema Definition
A schema SHALL be defined as a JavaScript object that adheres to JSON Schema.
Each schema SHOULD be exported from a standalone JavaScript or TypeScript file
for utilization within Neume's node network and MAY define a subset of data
within the network.

Here is an example of a schema definition:

```typescript
const trackSchema = {
  type: "object",
  properties: {
    title: {type: "string"},
    artist: {type: "string"},
    album: {type: "string"},
    year: {type: "integer"},
    source: {type: "string"}
  },
  required: ["title", "artist", "source"]
};
```
#### 1.2 Schema Identification
Each schema SHALL possess a unique identifier. This identifier SHALL be
determined by generating a BLAKE3 hash of the canonicalized schema document
using the `json-canonicalize` and `blake3` packages.

```typescript
import {hash} from 'blake3';
import canonicalize from 'json-canonicalize';

const schemaIdentifier = hash(canonicalize(trackSchema)).toString('hex');
```

#### 1.3 Schema Validation
Candidate data items MUST be validated against the schema to determine set
membership. The `ajv` and `ajv-formats` packages SHALL be used to validate data
against the schema.

```typescript
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(trackSchema);

const candidateDatum = {
  title: "Smells Like Teen Spirit",
  artist: "Nirvana",
  album: "Nevermind",
  year: 1991,
  source: "Spotify"
};

if (!validate(candidateDatum)) {
  console.log(validate.errors);
} else {
  console.log("Valid datum");
}
```

#### 1.4 Schema Derivation
A schema MAY be combined with a constraint schema to produce a constrained
subset, therefore, deriving a more specific subset of data. The parameters for
such constraint schemas MUST be included in the schema definition.

```typescript
const trackConstraintSchema = {
  properties: {
    year: {const: 1991},
  },
};

const constrainedSchemaIdentifier = hash(
  canonicalize(trackSchema) + canonicalize(trackConstraintSchema)
).toString('hex');
```

### 2. Strategy
#### 2.1 Strategy Definition
A strategy SHALL be a JavaScript or TypeScript function that receives data
conforming to an input schema and generates data conforming to an output
schema. The strategy MUST be explicitly associated with its input and output
schemas.

```typescript
class TrackStrategy {
  static inputSchema = trackSchema;
  static outputSchema = artistSchema;

  static async execute(track) {
    // Transform track to artist and validate against artistSchema
  }
}
```

#### 2.2 Strategy Parameterization
A strategy MAY be parameterized in a manner similar to schemas, allowing it to
be refined to a specific subset of the schema. For strategies that operate on
schemas with common constraints, these strategies MUST be parameterized to
accommodate such constraints. Parameters controlling the subset of data the
strategy operates on SHOULD be accepted by the strategy. These parameters SHALL
be included in the strategy definition.

Here is an example of a strategy parameterization which takes a year as a constraint:

```typescript
class TrackStrategy {
  static baseInputSchema = trackSchema;
  static baseOutputSchema = artistSchema;

  static inputSchema;
  static outputSchema;

  constructor(params) {
    this.inputSchema = {...this.baseInputSchema, ...params};
    this.outputSchema = {...this.baseOutputSchema, ...params};
  }

  static async execute(track) {
    // validate input against inputSchema, transform track to artist, validate output against outputSchema
  }
}

const trackStrategy1991 = new TrackStrategy(trackConstraintSchema);
```

### 3. Additional Requirements
#### 3.1 Data Provenance
Data items MUST include sufficient information to enable the source of the data
to be validated. For data derived from a blockchain, this SHOULD include the
CAIP-2 chain id for the blockchain, the contract address, and the token id. For
other data types, the required provenance data will be specific to the source.

## Rationale

This neuIP proposes the utilization of JSON Schema and JSON Canonicalization
Scheme (JCS) to standardize schema definition, identification, and validation
within the Neume network. This decision is guided by key considerations that
leverage the inherent benefits of these technologies and their alignment with
Neume's existing architecture and future objectives.

1. **JSON Schema for Schema Definition and Validation:** Given that Neume
   already incorporates JSON Schema, this technology presents a convenient and
   familiar choice for schema definition. Its flexibility facilitates the
   segmentation of Neume's monolithic schema into smaller subsets, resulting in
   more manageable and focused units of data. JSON Schema further enhances data
   integrity by not only enforcing schema adherence but also enabling robust
   data validation through its expressive constraints.

2. **JSON Canonicalization Scheme for Schema Identification:** In the context
   of a decentralized network like Neume, deterministic schema identification
   is critical to maintain coherence and consistency. JCS provides a
   standardized technique to achieve deterministic representation of JSON data,
   facilitating the generation of unique, consistent schema identifiers. This
   deterministic identification underpins efficient and reliable subset
   reconciliation within the network.

3. **Subset Partitioning and Deterministic Serialization:** The expressive
   constraint capabilities of JSON Schema allow for consistent partitioning of
   subsets, providing a versatile and efficient mechanism for data management
   within Neume. Complementing this, JCS ensures deterministic serialization of
   data, which is crucial in a decentralized setting to maintain data
   consistency across nodes.

Avro was considered due to its simplicity, efficient binary representation, and
robust schema evolution capabilities. However, its binary encoding could not
guarantee determinism and required an additional mechanism to implement schema
constraints. These considerations influenced the decision to favor JSON Schema
and JCS, as they offer a more comprehensive solution for our needs.

In summary, this neuIP is driven by the alignment of these technologies with
our project requirements and their compatibility with Neume's existing
technology stack. The aim is to establish precise, clear rules for schema
semantics, identification, validation, and evolution. In doing so, this
proposal seeks to foster a more efficient, scalable, and resilient Neume
network.

## Backwards Compatibility

TODO

## Reference Implementation

TODO

## Security Considerations

TODO

## Copyright

Copyright and related rights waived via [CC0](../LICENSE.md).
