# Security Policy

Gitoodo has not been released yet; this repository receives the source code with the first release.

## Reporting a vulnerability

Please do not open a public issue. Report it privately through
[GitHub Security Advisories](https://github.com/silvio-l/gitoodo/security/advisories/new).

Include a description and the impact, and steps to reproduce or a proof of concept if you have one.
You get an acknowledgment within a few days and a status update with an initial assessment within
two weeks. Credit in the release notes is given unless you prefer to stay anonymous.

## Scope before the first release

- The website at <https://gitoodo.com/>, including its contact form
- The published question format at <https://gitoodo.com/spec/questions/v2/>

From the first release on, the Gitoodo app, the `gitoodo` command line and its services, token
handling, the forge adapters and the install scripts are in scope as well; security fixes then go
into the latest release.

Out of scope: the forges themselves (GitHub, GitLab, Gitea, Forgejo), the coding agents Gitoodo
starts, third-party dependencies (please report those upstream) and social engineering.
