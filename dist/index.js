"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaspberryPiInfo = exports.revisions = void 0;
const fs_1 = __importDefault(require("fs"));
/** @see https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#new-style-revision-codes */
exports.revisions = {
    '900021': { model: 'A+', ram: '512MB', manufacturer: 'Sony UK' },
    '900032': { model: 'B+', ram: '512MB', manufacturer: 'Sony UK' },
    '900092': { model: 'Zero', ram: '512MB', manufacturer: 'Sony UK' },
    '900093': { model: 'Zero', ram: '512MB', manufacturer: 'Sony UK' },
    '9000c1': { model: 'Zero W', ram: '512MB', manufacturer: 'Sony UK' },
    '9020e0': { model: '3A+', ram: '512MB', manufacturer: 'Sony UK' },
    '9020e1': { model: '3A+', ram: '512MB', manufacturer: 'Sony UK' },
    '920092': { model: 'Zero', ram: '512MB', manufacturer: 'Embest' },
    '920093': { model: 'Zero', ram: '512MB', manufacturer: 'Embest' },
    '900061': { model: 'CM1', ram: '512MB', manufacturer: 'Sony UK' },
    'a01040': { model: '2B', ram: '1GB', manufacturer: 'Sony UK' },
    'a01041': { model: '2B', ram: '1GB', manufacturer: 'Sony UK' },
    'a02082': { model: '3B', ram: '1GB', manufacturer: 'Sony UK' },
    'a020a0': { model: 'CM3', ram: '1GB', manufacturer: 'Sony UK' },
    'a020d3': { model: '3B+', ram: '1GB', manufacturer: 'Sony UK' },
    'a020d4': { model: '3B+', ram: '1GB', manufacturer: 'Sony UK' },
    'a02042': { model: '2B (with BCM2837)', ram: '1GB', manufacturer: 'Sony UK' },
    'a21041': { model: '2B', ram: '1GB', manufacturer: 'Embest' },
    'a22042': { model: '2B (with BCM2837)', ram: '1GB', manufacturer: 'Embest' },
    'a22082': { model: '3B', ram: '1GB', manufacturer: 'Embest' },
    'a220a0': { model: 'CM3', ram: '1GB', manufacturer: 'Embest' },
    'a32082': { model: '3B', ram: '1GB', manufacturer: 'Sony Japan' },
    'a52082': { model: '3B', ram: '1GB', manufacturer: 'Stadium' },
    'a22083': { model: '3B', ram: '1GB', manufacturer: 'Embest' },
    'a02100': { model: 'CM3+', ram: '1GB', manufacturer: 'Sony UK' },
    'a03111': { model: '4B', ram: '1GB', manufacturer: 'Sony UK' },
    'b03111': { model: '4B', ram: '2GB', manufacturer: 'Sony UK' },
    'b03112': { model: '4B', ram: '2GB', manufacturer: 'Sony UK' },
    'b03114': { model: '4B', ram: '2GB', manufacturer: 'Sony UK' },
    'b03115': { model: '4B', ram: '2GB', manufacturer: 'Sony UK' },
    'c03111': { model: '4B', ram: '4GB', manufacturer: 'Sony UK' },
    'c03112': { model: '4B', ram: '4GB', manufacturer: 'Sony UK' },
    'c03114': { model: '4B', ram: '4GB', manufacturer: 'Sony UK' },
    'c03115': { model: '4B', ram: '4GB', manufacturer: 'Sony UK' },
    'd03114': { model: '4B', ram: '8GB', manufacturer: 'Sony UK' },
    'd03115': { model: '4B', ram: '8GB', manufacturer: 'Sony UK' },
    'c03130': { model: 'Pi 400', ram: '4GB', manufacturer: 'Sony UK' },
    'a03140': { model: 'CM4', ram: '1GB', manufacturer: 'Sony UK' },
    'b03140': { model: 'CM4', ram: '2GB', manufacturer: 'Sony UK' },
    'c03140': { model: 'CM4', ram: '4GB', manufacturer: 'Sony UK' },
    'd03140': { model: 'CM4', ram: '8GB', manufacturer: 'Sony UK' },
    '902120': { model: 'Zero 2 W', ram: '512MB', manufacturer: 'Sony UK' },
    'c04170': { model: '5', ram: '4GB', manufacturer: 'Sony UK' },
    'd04170': { model: '5', ram: '8GB', manufacturer: 'Sony UK' }
};
class RaspberryPiInfo {
    constructor(additionalRevisions = {}, raspberryPiBaseName = 'Raspberry Pi') {
        this.revisions = Object.assign(Object.assign({}, exports.revisions), additionalRevisions);
        this.raspberryPiBaseName = raspberryPiBaseName;
    }
    detect() {
        const info = {
            isRaspberry: false,
            model: null,
            fullModelName: null,
            fullModelNameWithRam: null,
            ram: null,
            manufacturer: null,
            revisionCode: null,
        };
        try {
            const revisionCode = this.readRevisionCode();
            if (revisionCode === null) {
                return info;
            }
            const revision = this.revisions[revisionCode];
            if (!revision) {
                return info;
            }
            info.isRaspberry = true;
            info.model = revision.model;
            info.fullModelName = `${this.raspberryPiBaseName} ${info.model}`;
            info.fullModelNameWithRam = `${this.raspberryPiBaseName} ${info.model} - ${revision.ram}`;
            info.ram = revision.ram;
            info.manufacturer = revision.manufacturer;
            info.revisionCode = revisionCode;
            return info;
        }
        catch (e) {
            // cpuinfo not found, prob not rpi
            return info;
        }
    }
    readRevisionCode() {
        const cpuInfo = fs_1.default.readFileSync('/proc/cpuinfo', { encoding: 'utf8' });
        const revisionLine = cpuInfo.split('\n')
            .reverse()
            .find(line => line.trim().startsWith('Revision'));
        if (!revisionLine) {
            return null;
        }
        return revisionLine.replace(/\s/g, '').replace('Revision:', '');
    }
}
exports.RaspberryPiInfo = RaspberryPiInfo;
