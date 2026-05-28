# Z-Stack ZNP Command Reference

> Auto-generated from the `zigbee-herdsman` ZNP definition (Z-Stack 3.x MT API).

## Legend

| Column | Meaning |
|--------|---------|
| **Subsystem** | ZNP subsystem ID (`SYS`=1, `MAC`=2, `NWK`=3, `AF`=4, `ZDO`=5, `SAPI`=6, `UTIL`=7, `DEBUG`=8, `APP`=9, `APP_CNF`=15, `GREENPOWER`=21) |
| **Name** | Command name used in `zigbee-herdsman` |
| **ID** | Hex command identifier within the subsystem |
| **Type** | `SREQ` = Synchronous request (host → NP, expects SRSP)<br>`AREQ` = Asynchronous request / indication (NP → host or host → NP with no reply) |
| **Description** | Short human-readable purpose |

---

## SYS (Subsystem 0x01)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `resetReq` | 0x00 | AREQ | Reset the device |
| `ping` | 0x01 | SREQ | Ping the NP (returns 16-bit capabilities mask) |
| `version` | 0x02 | SREQ | Get firmware version info |
| `setExtAddr` | 0x03 | SREQ | Set IEEE address |
| `getExtAddr` | 0x04 | SREQ | Get IEEE address |
| `ramRead` | 0x05 | SREQ | Read RAM |
| `ramWrite` | 0x06 | SREQ | Write RAM |
| `osalNvItemInit` | 0x07 | SREQ | Init NV item |
| `osalNvRead` | 0x08 | SREQ | Read NV item |
| `osalNvWrite` | 0x09 | SREQ | Write NV item |
| `osalStartTimer` | 0x0A | SREQ | Start OSAL timer |
| `osalStopTimer` | 0x0B | SREQ | Stop OSAL timer |
| `random` | 0x0C | SREQ | Get random value |
| `adcRead` | 0x0D | SREQ | Read ADC |
| `gpio` | 0x0E | SREQ | GPIO control |
| `stackTune` | 0x0F | SREQ | Stack tune (TX power / RX idle) |
| `setTime` | 0x10 | SREQ | Set time |
| `getTime` | 0x11 | SREQ | Get time |
| `osalNvDelete` | 0x12 | SREQ | Delete NV item |
| `osalNvLength` | 0x13 | SREQ | Get NV item length |
| `setTxPower` | 0x14 | SREQ | Set TX power |
| `jammerParameters` | 0x15 | SREQ | Set jammer parameters |
| `snifferParameters` | 0x16 | SREQ | Set sniffer parameters |
| `zdiagsInitStats` | 0x17 | SREQ | Init diagnostics |
| `zdiagsClearStats` | 0x18 | SREQ | Clear diagnostics |
| `zdiagsGetStats` | 0x19 | SREQ | Get diagnostics |
| `zdiagsRestoreStatsNv` | 0x1A | SREQ | Restore stats from NV |
| `zdiagsSaveStatsToNv` | 0x1B | SREQ | Save stats to NV |
| `osalNvReadExt` | 0x1C | SREQ | Extended NV read |
| `osalNvWriteExt` | 0x1D | SREQ | Extended NV write |
| `nvCreate` | 0x30 | SREQ | Create NV item |
| `nvDelete` | 0x31 | SREQ | Delete NV item |
| `nvLength` | 0x32 | SREQ | Get NV length |
| `nvRead` | 0x33 | SREQ | Read NV item |
| `nvWrite` | 0x34 | SREQ | Write NV item |
| `nvUpdate` | 0x35 | SREQ | Update NV item |
| `nvCompact` | 0x36 | SREQ | Compact NV |
| `resetInd` | 0x80 | AREQ | Reset indication |
| `osalTimerExpired` | 0x81 | AREQ | OSAL timer expired |
| `jammerInd` | 0x82 | AREQ | Jammer indication |

## MAC (Subsystem 0x02)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `resetReq` | 0x01 | SREQ | Reset MAC |
| `init` | 0x02 | SREQ | Init MAC |
| `startReq` | 0x03 | SREQ | Start MAC |
| `syncReq` | 0x04 | SREQ | Sync request |
| `dataReq` | 0x05 | SREQ | MAC data request |
| `associateReq` | 0x06 | SREQ | Associate request |
| `disassociateReq` | 0x07 | SREQ | Disassociate request |
| `getReq` | 0x08 | SREQ | Get MAC PIB |
| `setReq` | 0x09 | SREQ | Set MAC PIB |
| `scanReq` | 0x0C | SREQ | MAC scan |
| `pollReq` | 0x0D | SREQ | MAC poll |
| `purgeReq` | 0x0E | SREQ | Purge request |
| `setRxGainReq` | 0x0F | SREQ | Set RX gain |
| `securityGetReq` | 0x30 | SREQ | Security get |
| `securitySetReq` | 0x31 | SREQ | Security set |
| `associateRsp` | 0x50 | SREQ | Associate response |
| `orphanRsp` | 0x51 | SREQ | Orphan response |
| `syncLossInd` | 0x80 | AREQ | Sync loss indication |
| `associateInd` | 0x81 | AREQ | Associate indication |
| `associateCnf` | 0x82 | AREQ | Associate confirm |
| `beaconNotifyInd` | 0x83 | AREQ | Beacon notify |
| `dataCnf` | 0x84 | AREQ | Data confirm |
| `dataInd` | 0x85 | AREQ | Data indication |
| `disassociateInd` | 0x86 | AREQ | Disassociate indication |
| `disassociateCnf` | 0x87 | AREQ | Disassociate confirm |
| `orphanInd` | 0x8A | AREQ | Orphan indication |
| `pollCnf` | 0x8B | AREQ | Poll confirm |
| `scanCnf` | 0x8C | AREQ | Scan confirm |
| `commStatusInd` | 0x8D | AREQ | Comm status indication |
| `startCnf` | 0x8E | AREQ | Start confirm |
| `rxEnableCnf` | 0x8F | AREQ | RX enable confirm |
| `purgeCnf` | 0x90 | AREQ | Purge confirm |

## AF — Application Framework (Subsystem 0x04)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `register` | 0x00 | SREQ | Register endpoint |
| `dataRequest` | 0x01 | SREQ | AF data request |
| `dataRequestExt` | 0x02 | SREQ | Extended data request |
| `dataRequestSrcRtg` | 0x03 | SREQ | Data request with source route |
| `delete` | 0x04 | SREQ | Delete endpoint |
| `interPanCtl` | 0x10 | SREQ | Inter-PAN control |
| `dataStore` | 0x11 | SREQ | Data store |
| `dataRetrieve` | 0x12 | SREQ | Data retrieve |
| `apsfConfigSet` | 0x13 | SREQ | APS frame config set |
| `apsfConfigGet` | 0x14 | SREQ | APS frame config get |
| `dataConfirm` | 0x80 | AREQ | Data confirm |
| `incomingMsg` | 0x81 | AREQ | Incoming AF message |
| `incomingMsgExt` | 0x82 | AREQ | Extended incoming message |
| `reflectError` | 0x83 | AREQ | Reflect error |

## ZDO — Zigbee Device Objects (Subsystem 0x05)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `nwkAddrReq` | 0x00 | SREQ | Network address request |
| `ieeeAddrReq` | 0x01 | SREQ | IEEE address request |
| `nodeDescReq` | 0x02 | SREQ | Node descriptor request |
| `powerDescReq` | 0x03 | SREQ | Power descriptor request |
| `simpleDescReq` | 0x04 | SREQ | Simple descriptor request |
| `activeEpReq` | 0x05 | SREQ | Active endpoints request |
| `matchDescReq` | 0x06 | SREQ | Match descriptors request |
| `complexDescReq` | 0x07 | SREQ | Complex descriptor request |
| `userDescReq` | 0x08 | SREQ | User descriptor request |
| `endDeviceAnnce` | 0x0A | SREQ | End device announce |
| `userDescSet` | 0x0B | SREQ | Set user descriptor |
| `serverDiscReq` | 0x0C | SREQ | Server discovery |
| `endDeviceBindReq` | 0x20 | SREQ | End device bind |
| `bindReq` | 0x21 | SREQ | Bind request |
| `unbindReq` | 0x22 | SREQ | Unbind request |
| `setLinkKey` | 0x23 | SREQ | Set link key |
| `removeLinkKey` | 0x24 | SREQ | Remove link key |
| `getLinkKey` | 0x25 | SREQ | Get link key |
| `nwkDiscoveryReq` | 0x26 | SREQ | Network discovery |
| `joinReq` | 0x27 | SREQ | Join request |
| `sendData` | 0x28 | SREQ | Send data |
| `nwkAddrOfInterestReq` | 0x29 | SREQ | Nwk addr of interest |
| `mgmtNwkDiscReq` | 0x30 | SREQ | Mgmt network discovery |
| `mgmtLqiReq` | 0x31 | SREQ | Mgmt LQI request |
| `mgmtRtgReq` | 0x32 | SREQ | Mgmt routing table |
| `mgmtBindReq` | 0x33 | SREQ | Mgmt binding table |
| `mgmtLeaveReq` | 0x34 | SREQ | Mgmt leave |
| `mgmtDirectJoinReq` | 0x35 | SREQ | Mgmt direct join |
| `mgmtPermitJoinReq` | 0x36 | SREQ | Mgmt permit join |
| `mgmtNwkUpdateReq` | 0x37 | SREQ | Mgmt network update |
| `msgCbRegister` | 0x3E | SREQ | Register ZDO msg callback |
| `msgCbRemove` | 0x3F | SREQ | Remove ZDO msg callback |
| `startupFromApp` | 0x40 | SREQ | Startup from application |
| `autoFindDestination` | 0x41 | AREQ | Auto find destination |
| `secAddLinkKey` | 0x42 | SREQ | Add link key |
| `secEntryLookupExt` | 0x43 | SREQ | Security entry lookup |
| `secDeviceRemove` | 0x44 | SREQ | Remove security device |
| `extRouteDisc` | 0x45 | SREQ | Extended route discovery |
| `extRouteCheck` | 0x46 | SREQ | Extended route check |
| `extRemoveGroup` | 0x47 | SREQ | Remove group |
| `extRemoveAllGroup` | 0x48 | SREQ | Remove all groups |
| `extFindAllGroupsEndpoint` | 0x49 | SREQ | Find all groups |
| `extFindGroup` | 0x4A | SREQ | Find group |
| `extAddGroup` | 0x4B | SREQ | Add group |
| `extCountAllGroups` | 0x4C | SREQ | Count all groups |
| `extRxIdle` | 0x4D | SREQ | Set RX idle |
| `extUpdateNwkKey` | 0x4E | SREQ | Update network key |
| `extSwitchNwkKey` | 0x4F | SREQ | Switch network key |
| `extNwkInfo` | 0x50 | SREQ | Extended network info |
| `extSecApsRemoveReq` | 0x51 | SREQ | Remove APS security req |
| `forceConcentratorChange` | 0x52 | SREQ | Force concentrator change |
| `extSetParams` | 0x53 | SREQ | Extended set params |
| `endDeviceTimeoutReq` | 0x0D | SREQ | End device timeout |
| `setRejoinParametersReq` | 0xCC | SREQ | Set rejoin parameters |
| `nwkAddrRsp` | 0x80 | AREQ | Network address response |
| `ieeeAddrRsp` | 0x81 | AREQ | IEEE address response |
| `nodeDescRsp` | 0x82 | AREQ | Node descriptor response |
| `powerDescRsp` | 0x83 | AREQ | Power descriptor response |
| `simpleDescRsp` | 0x84 | AREQ | Simple descriptor response |
| `activeEpRsp` | 0x85 | AREQ | Active endpoints response |
| `matchDescRsp` | 0x86 | AREQ | Match descriptors response |
| `complexDescRsp` | 0x87 | AREQ | Complex descriptor response |
| `userDescRsp` | 0x88 | AREQ | User descriptor response |
| `userDescConf` | 0x89 | AREQ | User descriptor confirm |
| `serverDiscRsp` | 0x8A | AREQ | Server discovery response |
| `unknown` | 0x9F | AREQ | Unknown ZDO message |
| `endDeviceBindRsp` | 0xA0 | AREQ | End device bind response |
| `bindRsp` | 0xA1 | AREQ | Bind response |
| `unbindRsp` | 0xA2 | AREQ | Unbind response |
| `mgmtNwkDiscRsp` | 0xB0 | AREQ | Mgmt network discovery response |
| `mgmtLqiRsp` | 0xB1 | AREQ | Mgmt LQI response |
| `mgmtRtgRsp` | 0xB2 | AREQ | Mgmt routing response |
| `mgmtBindRsp` | 0xB3 | AREQ | Mgmt binding response |
| `mgmtLeaveRsp` | 0xB4 | AREQ | Mgmt leave response |
| `mgmtDirectJoinRsp` | 0xB5 | AREQ | Mgmt direct join response |
| `mgmtPermitJoinRsp` | 0xB6 | AREQ | Mgmt permit join response |
| `mgmtNwkUpdateNotify` | 0xB8 | AREQ | Mgmt network update notify |
| `stateChangeInd` | 0xC0 | AREQ | Device state change |
| `endDeviceAnnceInd` | 0xC1 | AREQ | End device announce |
| `matchDescRspSent` | 0xC2 | AREQ | Match desc response sent |
| `statusErrorRsp` | 0xC3 | AREQ | Status error response |
| `srcRtgInd` | 0xC4 | AREQ | Source route indication |
| `beacon_notify_ind` | 0xC5 | AREQ | Beacon notify indication |
| `joinCnf` | 0xC6 | AREQ | Join confirm |
| `nwkDiscoveryCnf` | 0xC7 | AREQ | Network discovery confirm |
| `concentratorIndCb` | 0xC8 | AREQ | Concentrator indication |
| `leaveInd` | 0xC9 | AREQ | Leave indication |
| `tcDeviceInd` | 0xCA | AREQ | Trust center device indication |
| `permitJoinInd` | 0xCB | AREQ | Permit join indication |
| `msgCbIncoming` | 0xFF | AREQ | ZDO message callback |

## SAPI (Subsystem 0x06)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `startRequest` | 0x00 | SREQ | Start request |
| `bindDevice` | 0x01 | SREQ | Bind device |
| `allowBind` | 0x02 | SREQ | Allow bind |
| `sendDataRequest` | 0x03 | SREQ | Send data |
| `readConfiguration` | 0x04 | SREQ | Read configuration |
| `writeConfiguration` | 0x05 | SREQ | Write configuration |
| `getDeviceInfo` | 0x06 | SREQ | Get device info |
| `findDeviceRequest` | 0x07 | SREQ | Find device |
| `permitJoiningRequest` | 0x08 | SREQ | Permit joining |
| `systemReset` | 0x09 | AREQ | System reset |
| `startConfirm` | 0x80 | AREQ | Start confirm |
| `bindConfirm` | 0x81 | AREQ | Bind confirm |
| `allowBindConfirm` | 0x82 | AREQ | Allow bind confirm |
| `sendDataConfirm` | 0x83 | AREQ | Send data confirm |
| `findDeviceConfirm` | 0x85 | AREQ | Find device confirm |
| `receiveDataIndication` | 0x87 | AREQ | Receive data indication |

## UTIL (Subsystem 0x07)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `getDeviceInfo` | 0x00 | SREQ | Get device info |
| `getNvInfo` | 0x01 | SREQ | Get NV info |
| `setPanid` | 0x02 | SREQ | Set PAN ID |
| `setChannels` | 0x03 | SREQ | Set channels |
| `setSeclevel` | 0x04 | SREQ | Set security level |
| `setPrecfgkey` | 0x05 | SREQ | Set pre-configured key |
| `callbackSubCmd` | 0x06 | SREQ | Callback subscribe |
| `keyEvent` | 0x07 | SREQ | Key event |
| `timeAlive` | 0x09 | SREQ | Time alive |
| `ledControl` | 0x0A | SREQ | LED control |
| `testLoopback` | 0x10 | SREQ | Test loopback |
| `dataReq` | 0x11 | SREQ | Data request |
| `gpioSetDirection` | 0x14 | SREQ | GPIO set direction |
| `gpioRead` | 0x15 | SREQ | GPIO read |
| `gpioWrite` | 0x16 | SREQ | GPIO write |
| `srcMatchEnable` | 0x20 | SREQ | Source match enable |
| `srcMatchAddEntry` | 0x21 | SREQ | Source match add |
| `srcMatchDelEntry` | 0x22 | SREQ | Source match delete |
| `srcMatchCheckSrcAddr` | 0x23 | SREQ | Source match check |
| `srcMatchAckAllPending` | 0x24 | SREQ | Source match ack all |
| `srcMatchCheckAllPending` | 0x25 | SREQ | Check all pending |
| `addrmgrExtAddrLookup` | 0x40 | SREQ | Address manager ext lookup |
| `addrmgrNwkAddrLookup` | 0x41 | SREQ | Address manager nwk lookup |
| `apsmeLinkKeyDataGet` | 0x44 | SREQ | Get APS link key data |
| `apsmeLinkKeyNvIdGet` | 0x45 | SREQ | Get APS link key NV ID |
| `assocCount` | 0x48 | SREQ | Association count |
| `assocFindDevice` | 0x49 | SREQ | Find associated device |
| `assocGetWithAddress` | 0x4A | SREQ | Get assoc with address |
| `apsmeRequestKeyCmd` | 0x4B | SREQ | APSME request key |
| `srngGen` | 0x4C | SREQ | SRNG generate |
| `bindAddEntry` | 0x4D | SREQ | Bind add entry |
| `assocRemove` | 0x63 | SREQ | Remove association |
| `assocAdd` | 0x64 | SREQ | Add association |
| `zclKeyEstInitEst` | 0x80 | SREQ | ZCL key establish init |
| `zclKeyEstSign` | 0x81 | SREQ | ZCL key establish sign |
| `syncReq` | 0xE0 | AREQ | Sync request |
| `zclKeyEstablishInd` | 0xE1 | AREQ | ZCL key establish indication |

## DEBUG (Subsystem 0x08)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `setThreshold` | 0x00 | SREQ | Set debug threshold |
| `msg` | 0x80 | AREQ | Debug message |

## APP (Subsystem 0x09)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `msg` | 0x00 | SREQ | Application message |
| `userTest` | 0x01 | SREQ | User test |
| `zllTlInd` | 0x81 | AREQ | ZLL touchlink indication |

## APP_CNF (Subsystem 0x0F)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `bdbAddInstallCode` | 0x04 | SREQ | BDB add install code |
| `bdbStartCommissioning` | 0x05 | SREQ | BDB start commissioning |
| `bdbSetChannel` | 0x08 | SREQ | BDB set channel |
| `bdbSetTcRequireKeyExchange` | 0x09 | SREQ | BDB set TC key exchange |
| `setNwkFrameCounter` | 0xFF | SREQ | Set network frame counter |
| `bdbComissioningNotifcation` | 0x80 | AREQ | BDB commissioning notification |

## GREENPOWER (Subsystem 0x15)

| Name | ID | Type | Description |
|------|----|------|-------------|
| `secReq` | 0x03 | SREQ | GreenPower security request |

## NWK (Subsystem 0x03)

> No commands exposed through ZNP in this firmware build.

---

## How to read a ZNP frame

A ZNP frame is structured as:

```
[ SOF = 0xFE ] [ LEN ] [ CMD0 ] [ CMD1 ] [ DATA… ] [ FCS ]
```

- **CMD0** = `(Type << 5) | Subsystem`
- **CMD1** = Command ID within the subsystem (see tables above)
- **FCS** = XOR checksum over `LEN`, `CMD0`, `CMD1`, and all `DATA` bytes

Example: `SYS_PING` SREQ
- Subsystem = `SYS` (1), Type = `SREQ` (1) → CMD0 = `0x21`
- Command ID = `0x01` → CMD1 = `0x01`
- Payload = empty → LEN = `0x00`
- Frame = `FE 00 21 01 20`

---

*Last updated: generated from `zigbee-herdsman@10.1.0` ZNP definition.*
