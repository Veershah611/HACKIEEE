#!/usr/bin/env python3
"""
Optimise the source LEGO renders for the web.

The generated PNGs are 1024-1536px and total ~49 MB, which is far too heavy
to ship — the hero alone would be ~18 MB. Nothing on the page displays them
above ~700 CSS px, so this script:

  1. trims fully-transparent margins,
  2. resizes to a cap chosen per role (see ROLES),
  3. exports WebP with alpha at quality 80.

Originals in assets/ are never modified. Output goes to public/assets/opt/.
Re-run after adding or replacing any source render:

    python tools/optimize-assets.py

Add --report to print the size table without writing anything.
"""

import os
import re
import sys
import glob

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'assets')
OUT = os.path.join(ROOT, 'public', 'assets', 'opt')

QUALITY = 80

# Max width in pixels, by role. Sized at roughly 1.5x the largest CSS box the
# asset appears in, which stays crisp on retina without paying for full 2x.
ROLES = {
    'backdrop': 900,   # track backgrounds, wide scene plates
    'prop':     620,   # minifigures, vehicles, machines
    'float':    520,   # drifting debris sheets, floaters
    'ui':       420,   # small decorative props, badges, strips
}

# Anything not listed falls back to 'prop'.
ASSET_ROLE = {
    'fintech_crash_ticker_board':               'backdrop',
    'lego_hospital_background':                 'backdrop',
    'sustainability_background_broken_earth':   'backdrop',
    'doomsday image':                           'backdrop',
    'destroyed_server_rack':                    'backdrop',

    'lego_bank_vault':                          'prop',
    'lego_asteroid':                            'prop',
    'healthcare_dna':                           'prop',
    'lego_laptop':                              'prop',
    'lego_bomb':                                'prop',
    'lego_rocket':                              'prop',
    'lego_torch':                               'prop',
    'display_frame':                            'prop',
    'settings':                                 'prop',
    'lego_large_redpress_button':               'prop',

    'cyber_hacker_minifig':                     'prop',
    'fintech_minifigure':                       'prop',
    'healthcare_minifig':                       'prop',
    'lego_sustainability_minifigure':           'prop',
    'minifig_flagholder':                       'prop',
    'hazmat_scientist':                         'prop',
    'lego_doom':                                'prop',
    'lego_spiderman':                           'prop',

    'fintech_coins':                            'float',
    'flying_cyber_bricks':                      'float',
    'flying bricks':                            'float',
    'lego_healthcare_floaters':                 'float',
    'lego_sustainability_floaters':             'float',

    'lava_ground_glow':                         'ui',
    'rubble_ground':                            'ui',
    'lego_road':                                'ui',
    'lego_cloud':                               'ui',
    'left_skyscraper':                          'ui',
    'right_skyscraper':                         'ui',
    'lego_warning strip':                       'ui',
    'leaking_barrel':                           'ui',
    'time_display_panel':                       'ui',
}


def slug(name):
    """web-safe kebab-case name — source files contain spaces and underscores"""
    s = re.sub(r'[_\s]+', '-', name.strip().lower())
    return re.sub(r'[^a-z0-9-]', '', s)


def process(path, write=True):
    stem = os.path.splitext(os.path.basename(path))[0]
    role = ASSET_ROLE.get(stem, 'prop')
    cap = ROLES[role]

    im = Image.open(path).convert('RGBA')
    before_px = im.size

    bbox = im.getchannel('A').getbbox()
    if bbox:
        im = im.crop(bbox)

    if im.width > cap:
        h = round(im.height * cap / im.width)
        im = im.resize((cap, h), Image.LANCZOS)

    dest = os.path.join(OUT, slug(stem) + '.webp')
    if write:
        os.makedirs(OUT, exist_ok=True)
        im.save(dest, 'WEBP', quality=QUALITY, method=6)
        after = os.path.getsize(dest)
    else:
        after = 0

    return {
        'src': os.path.basename(path),
        'dest': os.path.basename(dest),
        'role': role,
        'before_px': before_px,
        'after_px': im.size,
        'before': os.path.getsize(path),
        'after': after,
    }


def main():
    report_only = '--report' in sys.argv
    files = sorted(glob.glob(os.path.join(SRC, '*.png')))
    if not files:
        print('No PNGs found in %s' % SRC)
        return 1

    results = [process(f, write=not report_only) for f in files]
    results.sort(key=lambda r: -r['before'])

    print('%-42s %-6s %-11s %-11s %9s %9s' %
          ('asset', 'role', 'before', 'after', 'before', 'after'))
    print('-' * 96)
    for r in results:
        print('%-42s %-6s %-11s %-11s %8.2fM %8.1fK' % (
            r['dest'][:42], r['role'],
            '%dx%d' % r['before_px'], '%dx%d' % r['after_px'],
            r['before'] / 1048576, r['after'] / 1024))

    tb = sum(r['before'] for r in results)
    ta = sum(r['after'] for r in results)
    print()
    print('TOTAL  %.2f MB  ->  %.2f MB   (%.1f%% smaller, %d files)'
          % (tb / 1048576, ta / 1048576, (1 - ta / tb) * 100 if tb else 0, len(results)))
    if not report_only:
        print('Written to public/assets/opt/')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
