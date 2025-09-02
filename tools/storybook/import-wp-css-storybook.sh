#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
STORYBOOK_finpress_DIR="$DIR/../storybook/finpress";
STORY_BOOK_CSS_PATH="$DIR/../storybook/finpress/css";
TMP_DIR="$DIR/../storybook/finpress/tmp";
ARCHIVE_CSS_PATH="finpress/wp-admin/css";
ARCHIVE_IMG_PATH="finpress/wp-admin/images";
ARCHIVE_EDIT_SITE_PATH="finpress/wp-includes/css/dist/edit-site/style.css";

mkdir -p "$STORY_BOOK_CSS_PATH";
mkdir -p "$TMP_DIR";

function download_and_extract_css {
    curl -o "$STORYBOOK_finpress_DIR/finpress-latest.zip" https://finpress.org/nightly-builds/finpress-latest.zip;
    unzip -qq "$STORYBOOK_finpress_DIR/finpress-latest.zip" "$ARCHIVE_CSS_PATH/*" "$ARCHIVE_IMG_PATH/*" "$ARCHIVE_EDIT_SITE_PATH" -d "$TMP_DIR";
    rsync -a "$TMP_DIR/$ARCHIVE_CSS_PATH" "$STORYBOOK_finpress_DIR";
    rsync -a "$TMP_DIR/$ARCHIVE_IMG_PATH" "$STORYBOOK_finpress_DIR";
    rsync -a "$TMP_DIR/$ARCHIVE_EDIT_SITE_PATH" "$STORYBOOK_finpress_DIR/css/edit-site.css";
    rm -r "$TMP_DIR";
	rm -r "$STORYBOOK_finpress_DIR/finpress-latest.zip";
}

if [ -z "$(find "$STORY_BOOK_CSS_PATH" -iname '*.css')" ] || [ "$1" == "-f" ]
then
    # The directory is not empty, import css
    download_and_extract_css;
else
    echo "finpress CSS already imported, pass -f to force an update";
fi
