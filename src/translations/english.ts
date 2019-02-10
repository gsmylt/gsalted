import { Localization } from './types';

/* tslint:disable max-line-length */
export const english: Localization = {

  TIME: {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s:  'seconds',
      m:  'a minute',
      mm: '%d minutes',
      h:  'an hour',
      hh: '%d hours',
      d:  'a day',
      dd: '%d days',
      M:  'a month',
      MM: '%d months',
      y:  'a year',
      yy: '%d years',
    },
  },

  HEADER: {
    NAV: {
      SHARE_SECRET: 'Share a secret',
    },
  },

  HERO: {
    TITLE: 'Sending secrets made secure.',
    TITLE_MOBILE: 'Sending secrets made secure.',
    TEXT_1: 'From time to time you need to share a password or some other secret with your buddy. gsalted helps you to transfer secrets in a secure way.',
    TEXT_2: 'We use client-side encryption to ensure that no one else than you and your buddy can read your passwords.',
    SHARE: 'Let\'s share',
  },

  FEATURE_AREA: {
    TITLE: 'Why we love gsalted and you\'ll too',
    ENCRYPTED: {
      TITLE: 'Always encrypted',
      TEXT: 'Your secret gets encrypted on client-side before we send it to the cloud.',
    },
    FILES: {
      TITLE: 'Send files',
      TEXT: 'You can now even send files with gsalted in the same secure way.',
      BADGE: 'Coming soon',
    },
    CLEAN_UP: {
      TITLE: 'We clean up for you',
      TEXT: 'Your secret will be deleted after 24 hours (we keep it up to 30 days if you really want).',
    },
    LIKE: {
      TITLE: 'Simple. Fun. Secure. Free.',
      TEXT: 'There are a lot of things you will like about gsalted - just try it out, it’s free.',
    },
  },

  SECRET_CREATION: {
    SAVE_ERROR_MSG: 'Something went wrong, please try again.',
    DELETE_SUCCESS_MSG: 'Your secret has been deleted. Let\'s share a new one!',
    KEY_STEP: {
      TITLE: 'The key for encryption',
      DESCRIPTION: 'The key is used to encrypt your secret (along with a generated random key, but don\'t care about that). It should be as long as possible but easy to remember. You\'ll have to send it to your friend.',
      NEXT: 'Next',
      FIELDS: {
        KEY_PLACEHOLDER: 'Enter a key',
      },
      ACTIONS: {
        GENERATE_NEW_KEY: 'Generate new',
        GENERATE_NEW_KEY_MSG_1: 'Boom!',
        GENERATE_NEW_KEY_MSG_2: 'Yeah!',
        GENERATE_NEW_KEY_MSG_3: 'Kaboom!',
        GENERATE_NEW_KEY_MSG_4: 'Wow!',
        GENERATE_NEW_KEY_MSG_5: 'Nice!',
        GENERATE_NEW_KEY_MSG_6: 'Done!',
        GENERATE_NEW_KEY_MSG_7: 'Okay!',
      },
    },
    MAGIC_STEP: {
      TITLE: 'Do the magic',
      DESCRIPTION: 'Are you ready to share your se\'ll encrypt your secret and upload it into the cloud <i class="bx bx-cloud"></i>. We then provide you a unique link that you can share with your buddy.',
      DELETE_AUTOMATICALLY_LABEL: 'Delete automatically',
      ADVANCED_OPTIONS: 'Advanced options',
      GENERATE_LINK: 'Generate link',
      VALIDITY: {
        HOURS: 'hours',
        DAYS: 'days',
        WEEK: 'week',
        MONTH: 'month',
      },
    },
    SECRET_STEP: {
      TITLE: 'Your secret',
      DESCRIPTION: 'The secret is what you want to share with your buddy, be it a password or something else. Use the password we generated for you or enter your own.',
      FIELDS: {
        SECRET_PLACEHOLDER: 'Enter a secret',
      },
      ACTIONS: {
        GENERATE_NEW_SECRET: 'Generate new',
        GENERATE_NEW_KEY_MSG_1: 'Boom!',
        GENERATE_NEW_KEY_MSG_2: 'Yeah!',
        GENERATE_NEW_KEY_MSG_3: 'Kaboom!',
        GENERATE_NEW_KEY_MSG_4: 'Wow!',
        GENERATE_NEW_KEY_MSG_5: 'Nice!',
        GENERATE_NEW_KEY_MSG_6: 'Done!',
        GENERATE_NEW_KEY_MSG_7: 'Okay!',
      },
      NEXT: 'Next',
    },
    SHARE_STEP: {
      TITLE: 'Share your secret',
      DESCRIPTION: 'Yeah! We have encrypted your secret. Send the share link and your encryption key to your buddy. Please use two different mediums (e.g. e-mail and iMessage) to send them.',
      FIELDS: {
        SHARING_LINK_LABEL: 'Sharing link',
        ENCRYPTION_LINK_LABEL: 'Encryption key',
        SECRET_LABEL: 'Secret',
      },
      ACTIONS: {
        COPY_TO_CLIPBOARD: 'Copy to clipboard',
        COPY_TO_CLIPBOARD_MSG: 'Copied',
        SEND_BY_MAIL: 'Send by mail',
        SEND_BY_MAIL_MSG: 'Happy mailing',
        MAILTO_LINK: 'mailto:?subject=gsalted&body=Hi%2C%0A%0AI%20want%20to%20share%20a%20secret%20with%20you%3A%0A{link}',
      },
      DELETE: 'Delete secret',
      SHARE_NEW: 'Share a new secret',
    },
  },

  SECRET_RECEIVING: {
    DELETE_SUCCESS_MSG: 'We deleted your secret!',
    DECRYPTION_ERROR_MSG: 'Oh no, decryption failed. Please check your key!',
    KEY_STEP: {
      TITLE: 'The key for decryption',
      DESCRIPTION: 'The key will be needed to decrypt the secret. Please ask your friend if you have not received the key. The secret cannot be decrypted without the key.',
      FIELDS: {
        KEY_PLACEHOLDER: 'Enter the key',
      },
      DECRYPT_SECRET: 'Decrypt secret',
    },
    SECRET_STEP: {
      TITLE: 'Get the secret',
      DESCRIPTION: 'Yeah! We have successfully decrypted the secret.',
      FIELDS: {
        SECRET_LABEL: 'Secret',
      },
      ACTIONS: {
        COPY_TO_CLIPBOARD: 'Copy to clipboard',
        COPY_TO_CLIPBOARD_MSG: 'COPIED',
        TOGGLE_VISIBILITY: 'Toggle visibility',
      },
      DELETE_INFO: 'We\'ll automatically delete this secret from our servers in {validity}.',
      DELETE_SECRET: 'Delete secret',
      SHARE_NEW_SECRET: 'Share your own secret',
    },
  },

  FOOTER: {
    CONTACT: 'Contact',
    REPORT_BUG: 'Report a bug',
    DONATE: 'Donate',
    COPYRIGHT_MADE_WITH: 'Made with ',
    COPYRIGHT_BY: ' by ',
    COPYRIGHT_LOCATION: ' in Lucerne, Switzerland',
  },
};
