export const SOF = 0xfe;

export const CommandType = {
  POLL: 0,
  SREQ: 1,
  AREQ: 2,
  SRSP: 3,
} as const;
export type CommandType = (typeof CommandType)[keyof typeof CommandType];

export const Subsystem = {
  SYS: 0x01,
  MAC: 0x02,
  NWK: 0x03,
  AF: 0x04,
  ZDO: 0x05,
  SAPI: 0x06,
  UTIL: 0x07,
  DBG: 0x08,
  APP: 0x09,
} as const;
export type Subsystem = (typeof Subsystem)[keyof typeof Subsystem];

/* SYS commands ------------------------------------------------------------- */
export const SYS_RESET_REQ = 0x00;
export const SYS_PING = 0x01;
export const SYS_VERSION = 0x02;
export const SYS_RESET_IND = 0x80;

/* AF commands -------------------------------------------------------------- */
export const AF_REGISTER = 0x00;
export const AF_DATA_REQUEST = 0x01;
export const AF_INCOMING_MSG = 0x81;
export const AF_DATA_CONFIRM = 0x82;

/* ZDO commands ------------------------------------------------------------- */
export const ZDO_MGMT_PERMIT_JOIN_REQ = 0x36;
export const ZDO_MGMT_PERMIT_JOIN_RSP = 0xb6;
export const ZDO_STATE_CHANGE_IND = 0xc0;
