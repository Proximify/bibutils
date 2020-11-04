VERSION=1.1
DATE=2020

# List all libraries separated by a space (a new line nees a slash in previous).
# e.g., LIBRARIES=bib2xml ris2xml
LIBRARIES=bibutils_6.10
INSTALLDIR=../../../../bin

all : FORCE
	@for p in ${LIBRARIES}; \
		do ( cd $$p && sh -f configure --install-dir "$(INSTALLDIR)" && make install && make realclean && rm Makefile); \
	done

# Dummy unsatisfiable rule to force the making of the libraries
FORCE:
