# Bibutils

A PHP class to interface with the **Bibutils** libraries written in ANSI C. **Bibutils** is a set of C programs written by [Chris Putnam](https://ctan.org/author/putnam).

> "The bibutils program set inter-converts between various bibliography formats using a common [MODS-format XML](https://www.loc.gov/standards/mods/) intermediate. For example, one can convert RIS-format files to BibTeX by doing two transformations: RIS->MODS->BibTeX. By using a common intermediate for N formats, only 2N programs are required and not N^2-N. These programs operate on the command line and are styled after standard UNIX-like filters." (see [CTAN package](https://ctan.org/pkg/bibutils))

The current version of the libraries using in this project is [bibutils 6.10](https://sourceforge.net/projects/bibutils/files/), and are distributed under the [GNU General Public License Version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html).

## Metadata Object Description Schema (MODS)

"MODS is an XML schema and guidelines for encoding a resource description. It supports discovery and management of resources, and access to them, as well as exchange and management of encoded descriptions." (see [MODS](https://www.loc.gov/standards/mods/design-principles-mods-mads.html))

**Related:** [Metadata Authority Description Schema (MADS)](https://www.loc.gov/standards/mods/design-principles-mods-mads.html)

## Installation

```bash
$ composer require proximify/bibutils
```

## Class synopsis

```php
namespace Proximify;

class Bibutils {
    /* Methods */
    public static read( array $options) : string
    public static convert( string $options) : string
}
```

### `read`

```php
public static Bibutils::read( array $options ) : string
```

#### Description

This method reads read bibliographic contents of a file into a MOD XML string.
The input is inferred from the file extensions when not explicitly given.

#### Parameters

| Option key   | Description                       |
| ------------ | --------------------------------- |
| **filename** | The path to the source file name. |
| **in**       | An optional input format.         |

#### Return Values

The loaded bibliographic data. A generic **Exception** is thrown on error.

### `convert`

```php
public Bibutils::convert( array $options ) : string
```

#### Description

This method reads read bibliographic contents of a file into a MOD XML strin and converts it to a selected output bibliographic format. The input format is inferred from the file extensions when not explicitly given.

#### Parameters

| Option key   | Description                       |
| ------------ | --------------------------------- |
| **filename** | The path to the source file name. |
| **out**      | The output format.                |
| **in**       | An optional input format.         |

#### Return Values

The converted bibliographic data. A generic **Exception** is thrown on error.

## Examples

```php
use Proximify\Bibutils;

// Read an EndNote XML into MOD XML
$xml = Bibutils::read(['filename' => 'dev/data/bibtex/one_of_each.bib']);

// Load a RIS file and converted into a BibTex string
$bib = Bibutils::convert(['filename' => 'refs.ris', 'out' => 'bib']);
```

## CLI Scripts

```bash
composer app:read dev/data/bibtex/one_of_each.bib
composer app:convert dev/data/bibtex/one_of_each.bib end
```

---

## Bibutils references

-   [SourceForge Bibutils 6.10](https://sourceforge.net/projects/bibutils/files/bibutils_6.10_src.tgz/download)
-   [CTAN Bibutils 6.7](http://mirrors.ctan.org/biblio/bibtex/utils/bibutils/bibutils_6.7_src.tgz)

---

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to and actually do, grant us the rights to use your contribution. For details, visit our [Contributor License Agreement](https://github.com/Proximify/community/blob/master/docs/proximify-contribution-license-agreement.pdf).

When you submit a pull request, we will determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Proximify Open Source Code of Conduct](https://github.com/Proximify/community/blob/master/docs/code_of_conduct.md). For more information see the Code of Conduct FAQ or contact support@proximify.com with any additional questions or comments.

## License

Copyright (c) Proximify Inc. All rights reserved.

Licensed under the [GNU General Public License Version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) license.

**Software component** is made by [Proximify](https://proximify.com). We invite the community to participate.
