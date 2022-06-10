---
neuIP: 1
title: neuIP Purpose and Guidelines
status: Living
author: Dan Fowler <@djfnd>, Tim Daubenschütz <@TimDaub>
created: 2022-06-10
---


## What is an neuIP?

neuIP stands for neume Improvement Proposal. A neuIP is a design document providing information to the neume community, or describing a new feature for neume or its processes or environment. The neuIP should provide a concise technical specification of the feature and a rationale for the feature. The neuIP author is responsible for building consensus within the community and documenting dissenting opinions.

## neuIP Rationale

We intend neuIPs to be the primary mechanisms for proposing new features, for collecting community technical input on an issue, and for documenting the design decisions that have gone into neume. Because the neuIPs are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.

For neume implementers, neuIPs are a convenient way to track the progress of their implementation. Ideally each implementation maintainer would list the neuIPs that they have implemented. This will give end users a convenient way to know the current status of a given implementation or library.

## neuIP Types

At the current state of development, for the sake of simplicity, we consider all neuIPs to be Type-less. In the future we may wish to define different categories of Types and request that historical neuIPs are retro-defined accordingly.

## neuIP Work Flow

### Shepherding a neuIP

Parties involved in the process are you, the champion or *neuIP author*, and the *neume Core Team*

Before you begin writing a formal neuIP, you should vet your idea. Ask the neume community first if an idea is original and useful, the best location for such a discussion is the [neume-dev](https://discord.gg/sZFFPmFy7h) channel within the HIFI Labs Discord. 

Once the idea has been vetted, your next responsibility will be to present (by means of an neuIP) the idea to the neum Core Team and fellow Contributors to give feedback in the aforementioned channel. You should try and gauge whether the interest in your neuIP is commensurate with both the work involved in implementing it and how many parties will have to conform to it.

*In short, your role as the champion is to write the neuIP using the style and format described below, shepherd the discussions in the appropriate forums, and build community consensus around the idea.* 

### neuIP Process 

The following is the standardization process for all neuIPs in all tracks:

![neuIP Status Diagram](https://github.com/ethereum/EIPs/blob/master/assets/eip-1/EIP-process-update.jpg)

**Idea** - An idea that is pre-draft. This is not tracked within the neuIP Repository.

**Draft** - The first formally tracked stage of an neuIP in development. A neuIP is merged by a neuIP Editor into the neuIP repository when properly formatted.

**Review** - An neuIP Author marks a neuIP as ready for and requesting Peer Review.

**Last Call** - This is the final review window for a neuIP before moving to `Final`. A neuIP editor will assign `Last Call` status and set a review end date (`last-call-deadline`), typically 14 days later.

If this period results in necessary normative changes it will revert the neuIP to `Review`.

**Final** - This neuIP represents the final standard. A Final neuIP exists in a state of finality and should only be updated to correct errata and add non-normative clarifications.

**Stagnant** - Any neuIP in `Draft` or `Review` or `Last Call` if inactive for a period of 6 months or greater is moved to `Stagnant`. A neuIP may be resurrected from this state by Authors or neuIP Editors through moving it back to `Draft` or it's earlier status. If not resurrected, a proposal may stay forever in this status. 

>*neuIP Authors are notified of any algorithmic change to the status of their neuIP*

**Withdrawn** - The neuIP Author(s) have withdrawn the proposed neuIP. This state has finality and can no longer be resurrected using this neuIP number. If the idea is pursued at later date it is considered a new proposal.

**Living** - A special status for neuIPs that are designed to be continually updated and not reach a state of finality. This includes most notably neuIP-1.

## What belongs in a successful neuIP?

Each neuIP should have the following parts:

- Preamble - RFC 822 style headers containing metadata about the neuIP, including the neuIP number, a short descriptive title (limited to a maximum of 44 characters), a description (limited to a maximum of 140 characters), and the author details. The title and description should not include neuIP number. See [below](./neuIP-1.md#neuIP-header-preamble) for details.
- Abstract - Abstract is a multi-sentence (short paragraph) technical summary. This should be a very terse and human-readable version of the specification section. Someone should be able to read only the abstract to get the gist of what this specification does.
- Motivation - A motivation section is critical for neuIPs that want to change the neume protocol. It should clearly explain why the existing protocol specification is inadequate to address the problem that the neuIP solves. neuIP submissions without sufficient motivation may be rejected outright.
- Specification - The technical specification should describe the syntax and semantics of any new feature.
- Rationale - The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale should discuss important objections or concerns raised during discussion around the neuIP.
- Backwards Compatibility - All neuIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The neuIP must explain how the author proposes to deal with these incompatibilities. neuIP submissions without a sufficient backwards compatibility treatise may be rejected outright.
- Test Cases - Tests should either be inlined in the neuIP as data (such as input/expected output pairs, or included in `../assets/neuIP-###/<filename>`.
- Reference Implementation - An optional section that contains a reference/example implementation that people can use to assist in understanding or implementing this specification.
- Security Considerations - All neuIPs must contain a section that discusses the security implications/considerations relevant to the proposed change. Include information that might be important for security discussions, surfaces risks and can be used throughout the life-cycle of the proposal. E.g. include security-relevant design decisions, concerns, important discussions, implementation-specific guidance and pitfalls, an outline of threats and risks and how they are being addressed. neuIP submissions missing the "Security Considerations" section will be rejected. A neuIP cannot proceed to status "Final" without a Security Considerations discussion deemed sufficient by the reviewers.
- Copyright Waiver - All neuIPs must be in the public domain. The copyright waiver MUST link to the license file and use the following wording: `Copyright and related rights waived via [CC0](../LICENSE.md).`

## neuIP Formats and Templates

neuIPs should be written in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) format. They should follow the Ethereum EIP [template](https://github.com/ethereum/EIPs/blob/master/eip-template.md) where relevant.

## neuIP Header Preamble

Each neuIP must begin with an [RFC 822](https://www.ietf.org/rfc/rfc822.txt) style header preamble, preceded and followed by three hyphens (`---`). This header is also termed ["front matter" by Jekyll](https://jekyllrb.com/docs/front-matter/). The headers must appear in the following order.

`neuIP`: *neuIP number* (this is determined by the neuIP editor)

`title`: *The neuIP title is a few words, not a complete sentence*

`description`: *Description is one full (short) sentence*

`author`: *The list of the author's or authors' name(s) and/or username(s), or name(s) and email(s). Details are below.*

`discussions-to`: *The url pointing to the official discussion thread*

`status`: *Draft, Review, Last Call, Final, Stagnant, Withdrawn, Living*

`created`: *Date the neuIP was created on*

`requires`: *neuIP number(s)* (Optional field)

`withdrawal-reason`: *A sentence explaining why the neuIP was withdrawn.* (Optional field, only needed when status is `Withdrawn`)

Headers that permit lists must separate elements with commas.

Headers requiring dates will always do so in the format of ISO 8601 (yyyy-mm-dd).

#### `author` header

The `author` header lists the names, email addresses or usernames of the authors/owners of the neuIP. Those who prefer anonymity may use a username only, or a first name and a username. The format of the `author` header value must be:

> Random J. User &lt;address@dom.ain&gt;

or

> Random J. User (@username)

if the email address or GitHub username is included, and

> Random J. User

if the email address is not given.

It is not possible to use both an email and a GitHub username at the same time. If important to include both, one could include their name twice, once with the GitHub username, and once with the email.

At least one author must use a GitHub username, in order to get notified on change requests and have the capability to approve or reject them.

#### `discussions-to` header

While an neuIP is a draft, a `discussions-to` header will indicate the URL where the neuIP is being discussed.

The preferred discussion URL is a topic within Discussions on the neuIP repositary. The URL cannot point to Github pull requests, any URL which is ephemeral, and any URL which can get locked over time (i.e. Reddit topics).

#### `created` header

The `created` header records the date that the neuIP was assigned a number. Both headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

#### `requires` header

neuIPs may have a `requires` header, indicating the neuIP numbers that this neuIP depends on.

## Linking to External Resources

Links to external resources **SHOULD NOT** be included. External resources may disappear, move, or change unexpectedly.

## Linking to other neuIPs

References to other neuIPs should follow the format `neuIP-N` where `N` is the neuIP number you are referring to.  Each neuIP that is referenced in an neuIP **MUST** be accompanied by a relative markdown link the first time it is referenced, and **MAY** be accompanied by a link on subsequent references.  The link **MUST** always be done via relative paths so that the links work in this GitHub repository, forks of this repository, the main neuIPs site, mirrors of the main neuIP site, etc.  For example, you would link to this neuIP with `[neuIP-1](./neuIP-1.md)`.

## Auxiliary Files

Images, diagrams and auxiliary files should be included in a subdirectory of the `assets` folder for that neuIP as follows: `assets/neuIP-N` (where **N** is to be replaced with the neuIP number). When linking to an image in the neuIP, use relative links such as `../assets/neuIP-1/image.png`.

## Transferring neuIP Ownership

It occasionally becomes necessary to transfer ownership of neuIPs to a new champion. In general, we'd like to retain the original author as a co-author of the transferred neuIP, but that's really up to the original author. A good reason to transfer ownership is because the original author no longer has the time or interest in updating it or following through with the neuIP process, or has fallen off the face of the 'net (i.e. is unreachable or isn't responding to email). A bad reason to transfer ownership is because you don't agree with the direction of the neuIP. We try to build consensus around an neuIP, but if that's not possible, you can always submit a competing neuIP.

If you are interested in assuming ownership of an neuIP, send a message asking to take over, addressed to both the original author and the neuIP editor. If the original author doesn't respond to the email in a timely manner, the neuIP editor will make a unilateral decision (it's not like such decisions can't be reversed :)).

## neuIP Editors

The current EIP editors are currently the neume Core Team:

- Dan Fowler (@djfnd)
- Tim Daubenschütz (@TimDaub)


## neuIP Editor Responsibilities

For each new neuIP that comes in, an editor does the following:

- Read the neuIP to check if it is ready: sound and complete. The ideas must make technical sense, even if they don't seem likely to get to final status.
- The title should accurately describe the content.
- Check the neuIP for language (spelling, grammar, sentence structure, etc.), markup (GitHub flavored Markdown), code style

If the neuIP isn't ready, the editor will send it back to the author for revision, with specific instructions.

Once the neuIP is ready for the repository, the neuIP editor will:

- Assign a neuIP number (generally the PR number, but the decision is with the editors)
- Merge the corresponding [pull request](https://github.com/neume-network/neuIPs/pulls)
- Send a message back to the neuIP author with the next step.

Many neuIPs are written and maintained by developers with write access to the neume codebase. The neuIP editors monitor neuIP changes, and correct any structure, grammar, spelling, or markup mistakes we see.

The editors don't pass judgment on neuIPs. We merely do the administrative & editorial part.

## Style Guide

### Titles

The `title` field in the preamble:

 - Should not include the word "standard" or any variation thereof; and
 - Should not include the neuIP's number.

### Descriptions

The `description` field in the preamble:

 - Should not include the word "standard" or any variation thereof; and
 - Should not include the neuIP's number.

### neuIP numbers

When referring to an neuIP by number, it should be written in the hyphenated form `neuIP-X` where `X` is the neuIP's assigned number.

### RFC 2119

neuIPs are encouraged to follow [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt) for terminology and to insert the following at the beginning of the Specification section:

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## History

This document was derived heavily from [Ethereum's EIP-1](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md), which was in turn derived heavily from [Bitcoin's BIP-0001](https://github.com/bitcoin/bips) written by Amir Taaki, which in turn was derived from [Python's PEP-0001](https://www.python.org/dev/peps/). In many places text was simply copied and modified.

## Copyright

Copyright and related rights waived via [CC0](../LICENSE.md).
