# Bibutils 6.10

**By Christopher Putnam** (Software and Manual)
See [SourceForge Bibutils](http://www.sourceforge.net/p/bibutils/home/Bibutils)

This manual page is distributed under the terms of version 2 of the GNU General Public License.

DESCRIPTION
===========

The bibutils program set inter-converts between various bibliography formats using [Library of Congress](http://www.loc.gov)\'s [Metadata Object Description Schema (MODS)](http://www.loc.gov/standards/mods/) version 3.1. For example, one can convert RIS-format files to Bibtex by doing two transformations: RIS-\>MODS-\>Bibtex.

Converting to MODS
==================

Common Options Converting to MODS
---------------------------------

Several flags available for the end2xml, endx2xml, bib2xml, ris2xml, med2xml, and copac2xml programs. Most options have both a short and a long version.

`-h \ --help`

display help

`-v \ --version`

display version

`-a \ --add-refcount`

add \"\_\#\", where \# is reference count to reference id

`-s \ --single-refperfile`

put one reference per file name by the reference number

`-i \ --input-encoding`

interpret the input file as using the requested character set (use w/o argument for current list derived from character sets at [www.kostis.net](www.kostis.net)) unicode is now a character set option

`-u \ --unicode-characters`

encode unicode characters directly in the file rather than as XML
entities

`-un \ --unicode-no-bom`

as -u, but don\'t include a byte order mark

`-x \ --xml-entities`

encode unicode characters as XML entities (opposite of -u)

`-nl \ --no-latex`

do not convert latex-style character combinations

`-s \ --single-refperfile`

one reference per output file

`-d \ --drop-key`

don\'t put citation key in the mods id field

`-c \ --corporation-file`

with argument specifying a file containing a list of corporation names to be placed in \<name type=\"corporate\"\>\</name\> instead of type=\"personal\" and eliminate name mangling

`-a \ --asis`

with argument specifying a file containing a list of names to be treated
verbatim

`-nt \ --nosplit-title`

don\'t split titles into TITLE/SUBTITLE pairs

`--verbose`

verbose output

`--debug`

very verbose output (mostly for debugging)

bib2xml
-------

**bib2xml** converts a bibtex-formatted reference file to an
XML-intermediate bibliography file. Specify file(s) to be converted on
the command line. Files containing bibtex substitutions strings should
be specified before the files where substitutions are specified (or in
the same file before their use). If no files are specified, then bibtex
information will be read from standard input.

    bib2xml bibtex_file.bib > output_file.xml

biblatex2xml
------------

**biblatex2xml** converts a biblatex (not to be confused with bibtex)
formatted reference file to an MODS XML-intermediate bibliography file.

    biblatex2xml biblatex_file.bib > outputfile.xml

copac2xml
---------

**copac2xml**converts a COPAC formatted reference file to a MODS
XML-intermediate bibliography file.

end2xml
-------

**end2xml** converts a text endnote-formatted reference file to an
XML-intermediate bibliography file. This program will not work on the
binary library; the file needs to be exported first. Endnote tagged
formats (\"Refer\" format export) look like
[example\_title](#referexample). There are very nice instructions for
making sure that you are properly exporting this at
<http://www.sonnysoftware.com/endnoteimport.html>

Usage for **end2xml** is the same as **bib2xml**.

    end2xml endnote_file.end > output_file.xml

ebi2xml
-------

**ebi2xml** converts a EBI XML file to a MODS XML-intermediate
bibliography file.

endx2xml
--------

**endx2xml** converts a EndNote-XML exported reference file to a MODS
XML-intermediate bibliography file. This program will not work on the
binary library; the file needs to be exported first.

isi2xml
-------

**isi2xml** converts an ISI-web-of-science-formatted reference file to
an XML-intermediate bibliography file.

Usage for **isi2xml** is the same as **bib2xml**.

    isi2xml input_file.isi > output_file.xml

ris2xml
-------

**ris2xml** converts a RIS-formatted reference file to an
XML-intermediate bibliography file. **ris2xml** usage is as **end2xml**
and **bib2xml**

    ris2xml ris_file.ris > output_file.xml

wordbib2xml
-----------

**wordbib2xml** convert a Word2007-formatted reference file to an
XML-intermediate bibliogrpahy file.

Converting from MODS
====================

Common Options Converting from MODS
-----------------------------------

Note that *\--output-encoding* refers to the input file

`-h \ --help`

display help

`-v \ --version`

display version

`-o \ --output-encoding`

interpret the input file as using the requested character set (use w/o argument for current list derived from character sets at [www.kostis.net](www.kostis.net)) unicode is now a character set option

`-s \ --single-refperfile`

put one reference per file name by the reference number

`-nb \ --no-bom`

do not write Byte Order Mark if writing UTF8

xml2bib
-------

**xml2bib** converts the MODS XML bibliography into a bibtex-formatted reference file. **xml2bib** usage is as for other tools

    xml2bib xml_file.xml > output_file.bib

Since the BibTeX reference format is fairly flexible and seems to have the greatest number of personal preferences, it has also accumulated a number of specific options that are not available for other formats.

Starting with 3.24, xml2bib output uses lowercase tags and mixed case reference types for better interaction with other software. The older behavior with all uppercase tags/reference types can still be generated using the command-line switch -U/\--uppercase.

### xml2bib-specific Options:

`-fc \ --finalcomma`

add final comma in the bibtex output for those that want it

`-sd \ --singledash`

use one dash instead of two (longer dash in latex) between numbers in
page output

`-b \ --brackets`

use brackets instead of quotation marks around field data

`-w \ --whitespace`

add beautifying whitespace to output

`-U \ --uppercase`

use all uppercase for tags (field names) and reference types (pre-3.24 behavior)

`-sk \ --strictkey`

only use alphanumeric characters for bibtex citation keys

xml2ads
-------

**xml2ads** converts the MODS XML bibliography to the Smithsonian Astrophysical Observatory (SAO)/National Aeronautics and Space Administration (NASA) Astrophyics Data System or [ADS reference format](http://doc.adsabs.harvard.edu/abs_doc/help_pages/taggedformat.html) (which is very similar to the tagged Endnote style). **xml2ads** usage is as for other tools

    xml2ads xml_file.xml > output_file.ads

xml2ris
-------

**xml2ris** converts the MODS XML bibliography to RIS-formatted
bibliography file. **xml2ris** usage is as for other tools

    xml2ris xml_file.xml > output_file.ris

xml2end
-------

**xml2end** converts the MODS XML bibliography to tagged Endnote
(refer-format) bibliography file. **xml2end** usage is as for other
tools

    xml2end xml_file.xml >  output_file.end

xml2wordbib
-----------

**xml2wordbib** converts the MODS XML bibliography to Word 2007-formatted XML bibliography file. **xml2wordbib** usage is as for other tools

    xml2wordbib xml_file.xml >  output_file.word.xml

**xml2wordbib** was called xml2word in versions of bibutils prior to 3.40. It was renamed to avoid confusion with other tools. Hopefully this will not break too many scripts already in use.

Examples
========

    %0 Journal Article 
    %A C. D. Putnam
    %A C. S. Pikaard 
    %D 1992 
    %T Cooperative binding of the Xenopus RNA polymerase I 
       transcription factor xUBF to repetitive ribosomal gene enhancers 
    %J Mol Cell Biol 
    %V 12 
    %P 4970-4980 
    %F Putnam1992
        

`xml2bib` Output Variations
---------------------------

              @Article{Putnam1992, 
              author="C. D. Putnam
              and C. S. Pikaard",
              year="1992",
              month="Nov",
              title="Cooperative binding of the 
              Xenopus RNA polymerase I transcription 
              factor xUBF to repetitive ribosomal 
              gene enhancers",
              journal="Mol Cell Biol",
              volume="12",
              pages="4970--4980",
              number="11"}
            

              @Article{Putnam1992,
              author="C. D. Putnam
              and C. S. Pikaard",
              year="1992",
              month="Nov",
              title="Cooperative binding of the 
              Xenopus RNA polymerase I transcription 
              factor xUBF to repetitive ribosomal 
              gene enhancers",
              journal="Mol Cell Biol",
              volume="12",
              pages="4970--4980",
              number="11",}
            

              @Article{Putnam1992,
              author="C. D. Putnam
              and C. S. Pikaard",
              year="1992",
              month="Nov",
              title="Cooperative binding of the 
              Xenopus RNA polymerase I transcription 
              factor xUBF to repetitive ribosomal 
              gene enhancers",
              journal="Mol Cell Biol",
              volume="12",
              pages="4970-4980",
              number="11"}
            

    @Article{Putnam1992,
      author =      "C. D. Putnam
                    and C. S. Pikaard",
      year =        "1992",
      month =       "Jan",
      title =       "Cooperative binding of 
    the Xenopus RNA polymerase I transcription 
    factor xUBF to repetitive ribosomal gene 
    enhancers",
      journal =     "Mol Cell Biol",
      volume =      "12",
      pages =       "4970--4980"
    }

            @Article{Putnam1992,
            author={Putnam, C. D.
            and Pikaard, C. S.},
            title={Cooperative binding of the Xenopus 
            RNA polymerase I transcription factor xUBF 
            to repetitive ribosomal gene enhancers},
            journal={Mol Cell Biol},
            year={1992},
            month={Nov},
            volume={12},
            number={11},
            pages={4970--4980}
            }
          

              @ARTICLE{Putnam1992,
              AUTHOR="Putnam, C. D.
              and Pikaard, C. S.",
              TITLE="Cooperative binding of the Xenopus
              RNA polymerase I transcription factor xUBF
              to repetitive ribosomal gene enhancers",
              JOURNAL="Mol Cell Biol",
              YEAR="1992",
              MONTH="Nov",
              VOLUME="12",
              NUMBER="11",
              PAGES="4970--4980"
              }
            

License
=======

All versions of bibutils are relased under the GNU Public License (GPL). 

In a nutshell, feel free to download, run, and modify these programs as required. If you re-release these, you need to release the modified version of the source. (And I\'d appreciate patches as well\...if you care enough to make the change, then I\'d like to see what you\'re adding or fixing.)

[Chris Putnam, Ludwig Institute for Cancer Research](http://www.sourceforge.net/p/bibutils/home/Bibutils)
