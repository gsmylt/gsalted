import { Localization } from './types';

/* tslint:disable max-line-length */
export const german: Localization = {

  TIME: {
    relativeTime: {
      future: 'in %s',
      past: 'vor %s',
      s:  'Sekunden',
      m:  'einer Minute',
      mm: '%d Minunten',
      h:  'eine Stunde',
      hh: '%d Stunden',
      d:  'einem Tag',
      dd: '%d Tagen',
      M:  'einem Monat',
      MM: '%d Monaten',
      y:  'einem Jahr',
      yy: '%d Jahren',
    },
  },

  HEADER: {
    NAV: {
      SHARE_SECRET: 'Geheimnis teilen',
    },
  },

  HERO: {
    TITLE: 'Versende Geheimnisse einfach und sicher.',
    TITLE_MOBILE: 'Versende Geheimnisse einfach und sicher.',
    TEXT_1: 'Von Zeit zu Zeit musst du ein Passwort oder ein anderes Geheimnis mit jemandem teilen. gsalted hilft dir dabei, dein Geheimnis sicher zu versenden.',
    TEXT_2: 'Wir nutzen client-seitige Verschlüsselung um sicherzustellen, dass niemand ausser dir und deinem Freund das Passwort lesen kann.',
    SHARE: 'Jetzt ausprobieren',
  },

  FEATURE_AREA: {
    TITLE: 'Warum wir gsalted lieben - und du es auch tun wirst',
    ENCRYPTED: {
      TITLE: 'Immer verschlüsselt',
      TEXT: 'Wir verschlüsseln dein Gehemnis auf deinem Gerät, bevor wir es in die Cloud hochladen.',
    },
    FILES: {
      TITLE: 'Sende Dateien',
      TEXT: 'Die kannst jetzt sogar Dateien versenden, ebenso sicher wie Passwörter.',
      BADGE: 'Bald ',
    },
    CLEAN_UP: {
      TITLE: 'Wir räumen für dich auf',
      TEXT: 'Dein Geheimnis wird nach 24 Stunden automatisch gelöscht (oder bis zu 30 Tage behalten, wenn du möchtest).',
    },
    LIKE: {
      TITLE: 'Einfach. Sicher. Kostenlos.',
      TEXT: 'Es gibt so viele Gründe gsalted zu lieben - teste es einfach, kostenlos.',
    },
  },

  SECRET_CREATION: {
    SAVE_ERROR_MSG: 'Etwas ist schief gelaufen, versuche es erneut.',
    DELETE_SUCCESS_MSG: 'Dein Geheimnis wurde gelöscht. Zeit, ein neues zu teilen.',
    KEY_STEP: {
      TITLE: 'Der Schlüssel zum Verschlüsseln',
      DESCRIPTION: 'Der Schlüssel wird genutzt um dein Geheimnis zu verschlüsseln (zusammen mit einem zufällig generierten Schlüssel, aber das muss dich nicht kümmern). Er sollte solange wie möglich, aber auch einfach zu merken sein. Zu wirst in deine Kollegen mitteilen müssen.',
      NEXT: 'Weiter',
      FIELDS: {
        KEY_PLACEHOLDER: 'Schlüssel',
      },
      ACTIONS: {
        GENERATE_NEW_KEY: 'Generieren',
        GENERATE_NEW_KEY_MSG_1: 'Boom!',
        GENERATE_NEW_KEY_MSG_2: 'Juhuu!',
        GENERATE_NEW_KEY_MSG_3: 'Kaboom!',
        GENERATE_NEW_KEY_MSG_4: 'Wow!',
        GENERATE_NEW_KEY_MSG_5: 'Toll!',
        GENERATE_NEW_KEY_MSG_6: 'Erledigt!',
        GENERATE_NEW_KEY_MSG_7: 'Okay!',
      },
    },
    MAGIC_STEP: {
      TITLE: 'Verschlüsseln deines Geheimnisses',
      DESCRIPTION: 'BIst du bereit dein Geheimnis zu verschlüsseln und in die Cloud <i class="bx bx-cloud"></i> nochzuladen?. Wir stellen dir einen einzigartigen Link bereit, den zu deinem Freund senden kannst.',
      DELETE_AUTOMATICALLY_LABEL: 'Automatisch löschen',
      ADVANCED_OPTIONS: 'Erweiterte Optionen',
      GENERATE_LINK: 'Link generieren',
      VALIDITY: {
        HOURS: 'Stunden',
        DAYS: 'Tage',
        WEEK: 'Woche',
        MONTH: 'Monat',
      },
    },
    SECRET_STEP: {
      TITLE: 'Dein Geheimnis',
      DESCRIPTION: 'Das Geheimnis ist das, was du mit deinem Kollegen teilen möchtest, etwa ein Passwort oder eine Nachricht. Nutze das generierte Passwort oder tippe dein eigenes Geheimnis ein.',
      FIELDS: {
        SECRET_PLACEHOLDER: 'Geheimnis',
      },
      ACTIONS: {
        GENERATE_NEW_SECRET: 'Generieren',
        GENERATE_NEW_KEY_MSG_1: 'Boom!',
        GENERATE_NEW_KEY_MSG_2: 'Juhuu!',
        GENERATE_NEW_KEY_MSG_3: 'Kaboom!',
        GENERATE_NEW_KEY_MSG_4: 'Wow!',
        GENERATE_NEW_KEY_MSG_5: 'Toll!',
        GENERATE_NEW_KEY_MSG_6: 'Erledigt!',
        GENERATE_NEW_KEY_MSG_7: 'Okay!',
      },
      NEXT: 'Weiter',
    },
    SHARE_STEP: {
      TITLE: 'Teile dein Geheimnis',
      DESCRIPTION: 'Juhuu! Wir haben dein Geheimnis sicher verschlüsselt. Sende nun den folgenden Link und den Schlüssel deinem Kollegen. Bitte nutze dafür zwei verschiedene Wege (z.B. per E-Mail und per iMessage).',
      FIELDS: {
        SHARING_LINK_LABEL: 'Link',
        ENCRYPTION_LINK_LABEL: 'Schlüssel',
        SECRET_LABEL: 'Geheimnis',
      },
      ACTIONS: {
        COPY_TO_CLIPBOARD: 'In Zwischenablage kopieren',
        COPY_TO_CLIPBOARD_MSG: 'Kopiert',
        SEND_BY_MAIL: 'E-Mail senden',
        SEND_BY_MAIL_MSG: 'Viel Spass beim Mailen',
        MAILTO_LINK: 'mailto:?subject=gsalted&body=Hallo%2C%0A%0AIch%20möchte%20ein%20Geheimnis%20mit%20dir%20teilen%3A%0A{link}',
      },
      DELETE: 'Geheimnis löschen',
      SHARE_NEW: 'Neues Geheimnis teilen',
    },
  },

  SECRET_RECEIVING: {
    DELETE_SUCCESS_MSG: 'Wir haben dein Geheimnis gelöscht.',
    DECRYPTION_ERROR_MSG: 'Oh, etwas ist schiefgelaufen. Bitte prüfe den Schlüssel.',
    KEY_STEP: {
      TITLE: 'Der Schlüssel zum Entschlüsseln',
      DESCRIPTION: 'Der Schlüssel wird zum Entschlüsseln des Geheimnisses benötigt. Bitte frage deinen Freund, solltest du ihn nicht erhalten haben. Ohne den Schlüsseln können wir das Geheimnis leider nicht entschlüsseln.',
      FIELDS: {
        KEY_PLACEHOLDER: 'Schlüssel',
      },
      DECRYPT_SECRET: 'Geheimnis entschlüsseln',
    },
    SECRET_STEP: {
      TITLE: 'Dein Geheimnis',
      DESCRIPTION: 'Juhuu! Wir haben das Geheimnis entschlüsselt.',
      FIELDS: {
        SECRET_LABEL: 'Geheimnis',
      },
      ACTIONS: {
        COPY_TO_CLIPBOARD: 'In Zwischenablage kopieren',
        COPY_TO_CLIPBOARD_MSG: 'Kopiert',
        TOGGLE_VISIBILITY: 'Ein-/Ausblenden',
      },
      DELETE_INFO: 'Wir löschen dieses Geheimnis in {validity} automatisch von unseren Servern.',
      DELETE_SECRET: 'Geheimnis löschen',
      SHARE_NEW_SECRET: 'Eigenes Geheimnis teilen',
    },
  },

  FOOTER: {
    CONTACT: 'Kontakt',
    REPORT_BUG: 'Fehler melden',
    DONATE: 'Spenden',
    COPYRIGHT_MADE_WITH: 'Entwickelt mit ',
    COPYRIGHT_BY: ' von ',
    COPYRIGHT_LOCATION: ' in Luzern, Schweiz.',

  },
};
