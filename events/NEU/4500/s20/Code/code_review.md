# A1 Part 1 Code Review

### 2/30/20, 2:50-4:30a.m.


## Participants:

-   Presenters:

    -   Joe Student - `student.j@husky.neu.edu`
    -   Jane Pupil - `pupil.j@husky.neu.edu`

-   Panelists:

    -   Artem Pelenitsyn - Lead Reviewer
    -   Bhaskar Vemuri - Second Reviewer
    -   Sahithi Vankayalapati - Secretary


## Issues Discovered:

-   README does not contain the usual, expected information---e.g.,
    the software requirements and versions, and instructions for
    using your software.

-   Use more specific exceptions to signal the specific problems you encounter.

-   You should have more, finer-grain tests. These tests should
    clearly demarcate what functionality they are testing.

-   You should rewrite the `Column` class definition to follow basic OOD principles.

-   Use an `enum`, or other more strict datatype, for the type of `Column`.

-   Your design decision to scan and write the file in memory is not
    efficient. Redesign, implement for more efficient processing.

-   `construct_schema` is throwing exceptions (e.g. at `FLOAT`) that
    should instead be handled by casting.

-   Deconstruct/refactor `construct_schema` into smaller, individual
    methods---each with a single functionality. Eschew tightly nested
    implicit control.
