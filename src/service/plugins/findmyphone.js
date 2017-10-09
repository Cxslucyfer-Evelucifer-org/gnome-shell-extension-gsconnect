"use strict";

// Imports
const Lang = imports.lang;
const Gettext = imports.gettext.domain("gsconnect");
const _ = Gettext.gettext;

const Gio = imports.gi.Gio;

// Local Imports
function getPath() {
    // Diced from: https://github.com/optimisme/gjs-examples/
    let m = new RegExp("@(.+):\\d+").exec((new Error()).stack.split("\n")[1]);
    let p = Gio.File.new_for_path(m[1]).get_parent().get_parent().get_parent();
    return p.get_path();
}

imports.searchPath.push(getPath());

const Common = imports.common;
const Protocol = imports.service.protocol;
const PluginsBase = imports.service.plugins.base;


var METADATA = {
    name: "findmyphone",
    summary: _("Locate Device"),
    description: _("Locate a device by making it ring"),
    incomingPackets: [],
    outgoingPackets: ["kdeconnect.findmyphone.request"]
};


/**
 * FindMyPhone Plugin
 * https://github.com/KDE/kdeconnect-kde/tree/master/plugins/findmyphone
 */
var Plugin = new Lang.Class({
    Name: "GSConnectFindMyPhonePlugin",
    Extends: PluginsBase.Plugin,
    
    _init: function (device) {
        this.parent(device, "findmyphone");
    },
    
    handlePacket: function (packet) {
        Common.debug("FindMyPhone: handlePacket()");
        
        log("This should never be called since there is no incoming packet");
    },
    
    ring: function () {
        Common.debug("FindMyPhone: ring()");
        
        if (this.device.connected && this.device.paired) {
            let packet = new Protocol.Packet();
            packet.type = "kdeconnect.findmyphone.request";
            
            this.device._channel.send(packet);
        }
    }
});

