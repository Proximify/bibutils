# Bibutils

A PHP class to interface with the **Bibutils** libraries written in ANSI C. **Bibutils** is a set of C programs written by [Chris Putnam](https://ctan.org/author/putnam).

> "The bibutils program set inter-converts between various bibliography formats using a common MODS-format XML intermediate. For example, one can convert RIS-format files to BibTeX by doing two transformations: RIS->MODS->BibTeX. By using a common intermediate for N formats, only 2N programs are required and not N^2-N. These programs operate on the command line and are styled after standard UNIX-like filters." (see [CTAN package](https://ctan.org/pkg/bibutils))

The current version of the libraries using in this project is [bibutils 6.7](http://mirrors.ctan.org/biblio/bibtex/utils/bibutils/bibutils_6.7_src.tgz), and are distributed under the [GNU General Public License Version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html).

## Installation

```bash
$ composer require proximify/bibutils
```

## Class and Methods

The class constructor has no arguments.

```php
use Proximify\Bibutils;

$bibutils = new Bibutils();
```

## The `convert` method

```php
convert( string $source , string $target, ?string $in = null, ?string $out = null) : void
```

### Description

This method converts the contents of a source file and saves them into a target file. The input and output formats are inferred from the file extensions when not explicitly given.

### Parameters

- **source**<br>The source file name.
- **target**<br>The target file name.
- **in**<br>The input format. It is inferred from the source's filename extension if not given.
- **out**<br>The output format. It is inferred from the target's filename extension if not given.

### Return Values

There are no return values. A generic **Exception** is thrown on error.

### Examples

```php
use Proximify\Bibutils;

$bibutils = new Bibutils();

$bibutils->convert('./bibs.ris', './bibs.bib');
```

---

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to and actually do, grant us the rights to use your contribution. For details, visit our [Contributor License Agreement](https://github.com/Proximify/community/blob/master/docs/proximify-contribution-license-agreement.pdf).

When you submit a pull request, we will determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Proximify Open Source Code of Conduct](https://github.com/Proximify/community/blob/master/docs/code_of_conduct.md). For more information see the Code of Conduct FAQ or contact support@proximify.com with any additional questions or comments.

## License

Copyright (c) Proximify Inc. All rights reserved.

Licensed under the [GNU General Public License Version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) license.

**Software component** is made by [Proximify](https://proximify.com). We invite the community to participate.
