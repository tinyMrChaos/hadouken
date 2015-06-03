var config = require("config");
var events = require("events");

var eventMap = {
    // name                        libtorrent alert
    "peer.blockDownloading":       "block_downloading_alert",
    "peer.blockFinished":          "block_finished_alert",
    "peer.blockTimeout":           "block_timeout_alert",
    "torrent.cacheFlushed":        "cache_flushed_alert",
    "dht.bootstrap":               "dht_bootstrap_alert",
    "dht.reply":                   "dht_reply_alert",
    "externalAddress":             "external_ip_alert",
    "file.completed":              "file_completed_alert",
    "file.error":                  "file_error_alert",
    "file.renamed":                "file_renamed_alert",
    "file.renameFailed":           "file_rename_failed_alert",
    "torrent.hashFailed":          "hash_failed_alert",
    "incomingConnection":          "incoming_connection_alert",
    "listenSucceeded":             "listen_succeeded_alert",
    "peer.lsd":                    "lsd_peer_alert",
    "torrent.metadataFailed":      "metadata_failed_alert",
    "torrent.metadataReceived":    "metadata_received_alert",
    "peer.ban":                    "peer_ban_alert",
    "peer.blocked":                "peer_blocked_alert",
    "peer.connect":                "peer_connect_alert",
    "peer.disconnected":           "peer_disconnected_alert",
    "peer.error":                  "peer_error_alert",
    "peer.snubbed":                "peer_snubbed_alert",
    "peer.unsnubbed":              "peer_unsnubbed_alert",
    "torrent.performanceWarning":  "performance_alert",
    "piece.finished":              "piece_finished_alert",
    "peer.requestDropped":         "request_dropped_alert",
    "tracker.scrapeReply":         "scrape_reply_alert",
    "tracker.scrapeFailed":        "scrape_failed_alert",
    "torrent.stateChanged":        "state_changed_alert",
    "torrent.stats":               "stats_alert",
    "torrent.moved":               "storage_moved_alert",
    "torrent.moveFailed":          "storage_moved_failed_alert",
    "torrent.add":                 "add_torrent_alert",
    "torrent.added":               "torrent_added_alert",
    "torrent.checked":             "torrent_checked_alert",
    "torrent.deleted":             "torrent_deleted_alert",
    "torrent.deleteFailed":        "torrent_delete_failed_alert",
    "torrent.error":               "torrent_error_alert",
    "torrent.finished":            "torrent_finished_alert",
    "torrent.needCertificate":     "torrent_need_cert_alert",
    "torrent.paused":              "torrent_paused_alert",
    "torrent.resumed":             "torrent_resumed_alert",
    "torrent.removed":             "torrent_removed_alert",
    "tracker.id":                  "trackerid_alert",
    "tracker.announce":            "tracker_announce_alert",
    "tracker.error":               "tracker_error_alert",
    "tracker.reply":               "tracker_reply_alert",
    "tracker.warning":             "tracker_warning_alert",
    "peer.unwantedBlock":          "unwanted_block_alert",
    "torrent.urlSeed":             "url_seed_alert"
};

function on(eventName, callback) {
    if(!eventMap[eventName]) {
        throw new Error("Unknown event: " + eventName);
    }

    return events.register(eventMap[eventName], callback);
}

exports.session.on = on;

exports.AddTorrentParams.getDefault = function() {
    var p        = new exports.AddTorrentParams();
    p.flags     |= 0x1000;
    p.savePath   = config.getString("bittorrent.defaultSavePath") || ".";
    p.sparseMode = config.getBoolean("bittorrent.storage.sparse") || true;

    return p;
}