
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.tensorflow = (function() {

    /**
     * Namespace tensorflow.
     * @exports tensorflow
     * @namespace
     */
    var tensorflow = {};

    tensorflow.magenta = (function() {

        /**
         * Namespace magenta.
         * @memberof tensorflow
         * @namespace
         */
        var magenta = {};

        magenta.NoteSequence = (function() {

            /**
             * Properties of a NoteSequence.
             * @memberof tensorflow.magenta
             * @interface INoteSequence
             * @property {string|null} [id] NoteSequence id
             * @property {string|null} [filename] NoteSequence filename
             * @property {number|null} [referenceNumber] NoteSequence referenceNumber
             * @property {string|null} [collectionName] NoteSequence collectionName
             * @property {number|null} [ticksPerQuarter] NoteSequence ticksPerQuarter
             * @property {Array.<tensorflow.magenta.NoteSequence.ITimeSignature>|null} [timeSignatures] NoteSequence timeSignatures
             * @property {Array.<tensorflow.magenta.NoteSequence.IKeySignature>|null} [keySignatures] NoteSequence keySignatures
             * @property {Array.<tensorflow.magenta.NoteSequence.ITempo>|null} [tempos] NoteSequence tempos
             * @property {Array.<tensorflow.magenta.NoteSequence.INote>|null} [notes] NoteSequence notes
             * @property {number|null} [totalTime] NoteSequence totalTime
             * @property {number|null} [totalQuantizedSteps] NoteSequence totalQuantizedSteps
             * @property {Array.<tensorflow.magenta.NoteSequence.IPitchBend>|null} [pitchBends] NoteSequence pitchBends
             * @property {Array.<tensorflow.magenta.NoteSequence.IControlChange>|null} [controlChanges] NoteSequence controlChanges
             * @property {Array.<tensorflow.magenta.NoteSequence.IPartInfo>|null} [partInfos] NoteSequence partInfos
             * @property {tensorflow.magenta.NoteSequence.ISourceInfo|null} [sourceInfo] NoteSequence sourceInfo
             * @property {Array.<tensorflow.magenta.NoteSequence.ITextAnnotation>|null} [textAnnotations] NoteSequence textAnnotations
             * @property {Array.<tensorflow.magenta.NoteSequence.ISectionAnnotation>|null} [sectionAnnotations] NoteSequence sectionAnnotations
             * @property {Array.<tensorflow.magenta.NoteSequence.ISectionGroup>|null} [sectionGroups] NoteSequence sectionGroups
             * @property {tensorflow.magenta.NoteSequence.IQuantizationInfo|null} [quantizationInfo] NoteSequence quantizationInfo
             * @property {tensorflow.magenta.NoteSequence.ISubsequenceInfo|null} [subsequenceInfo] NoteSequence subsequenceInfo
             * @property {tensorflow.magenta.ISequenceMetadata|null} [sequenceMetadata] NoteSequence sequenceMetadata
             */

            /**
             * Constructs a new NoteSequence.
             * @memberof tensorflow.magenta
             * @classdesc Represents a NoteSequence.
             * @implements INoteSequence
             * @constructor
             * @param {tensorflow.magenta.INoteSequence=} [properties] Properties to set
             */
            function NoteSequence(properties) {
                this.timeSignatures = [];
                this.keySignatures = [];
                this.tempos = [];
                this.notes = [];
                this.pitchBends = [];
                this.controlChanges = [];
                this.partInfos = [];
                this.textAnnotations = [];
                this.sectionAnnotations = [];
                this.sectionGroups = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NoteSequence id.
             * @member {string} id
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.id = "";

            /**
             * NoteSequence filename.
             * @member {string} filename
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.filename = "";

            /**
             * NoteSequence referenceNumber.
             * @member {number} referenceNumber
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.referenceNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * NoteSequence collectionName.
             * @member {string} collectionName
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.collectionName = "";

            /**
             * NoteSequence ticksPerQuarter.
             * @member {number} ticksPerQuarter
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.ticksPerQuarter = 0;

            /**
             * NoteSequence timeSignatures.
             * @member {Array.<tensorflow.magenta.NoteSequence.ITimeSignature>} timeSignatures
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.timeSignatures = $util.emptyArray;

            /**
             * NoteSequence keySignatures.
             * @member {Array.<tensorflow.magenta.NoteSequence.IKeySignature>} keySignatures
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.keySignatures = $util.emptyArray;

            /**
             * NoteSequence tempos.
             * @member {Array.<tensorflow.magenta.NoteSequence.ITempo>} tempos
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.tempos = $util.emptyArray;

            /**
             * NoteSequence notes.
             * @member {Array.<tensorflow.magenta.NoteSequence.INote>} notes
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.notes = $util.emptyArray;

            /**
             * NoteSequence totalTime.
             * @member {number} totalTime
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.totalTime = 0;

            /**
             * NoteSequence totalQuantizedSteps.
             * @member {number} totalQuantizedSteps
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.totalQuantizedSteps = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * NoteSequence pitchBends.
             * @member {Array.<tensorflow.magenta.NoteSequence.IPitchBend>} pitchBends
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.pitchBends = $util.emptyArray;

            /**
             * NoteSequence controlChanges.
             * @member {Array.<tensorflow.magenta.NoteSequence.IControlChange>} controlChanges
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.controlChanges = $util.emptyArray;

            /**
             * NoteSequence partInfos.
             * @member {Array.<tensorflow.magenta.NoteSequence.IPartInfo>} partInfos
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.partInfos = $util.emptyArray;

            /**
             * NoteSequence sourceInfo.
             * @member {tensorflow.magenta.NoteSequence.ISourceInfo|null|undefined} sourceInfo
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.sourceInfo = null;

            /**
             * NoteSequence textAnnotations.
             * @member {Array.<tensorflow.magenta.NoteSequence.ITextAnnotation>} textAnnotations
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.textAnnotations = $util.emptyArray;

            /**
             * NoteSequence sectionAnnotations.
             * @member {Array.<tensorflow.magenta.NoteSequence.ISectionAnnotation>} sectionAnnotations
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.sectionAnnotations = $util.emptyArray;

            /**
             * NoteSequence sectionGroups.
             * @member {Array.<tensorflow.magenta.NoteSequence.ISectionGroup>} sectionGroups
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.sectionGroups = $util.emptyArray;

            /**
             * NoteSequence quantizationInfo.
             * @member {tensorflow.magenta.NoteSequence.IQuantizationInfo|null|undefined} quantizationInfo
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.quantizationInfo = null;

            /**
             * NoteSequence subsequenceInfo.
             * @member {tensorflow.magenta.NoteSequence.ISubsequenceInfo|null|undefined} subsequenceInfo
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.subsequenceInfo = null;

            /**
             * NoteSequence sequenceMetadata.
             * @member {tensorflow.magenta.ISequenceMetadata|null|undefined} sequenceMetadata
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             */
            NoteSequence.prototype.sequenceMetadata = null;

            /**
             * Creates a new NoteSequence instance using the specified properties.
             * @function create
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {tensorflow.magenta.INoteSequence=} [properties] Properties to set
             * @returns {tensorflow.magenta.NoteSequence} NoteSequence instance
             */
            NoteSequence.create = function create(properties) {
                return new NoteSequence(properties);
            };

            /**
             * Encodes the specified NoteSequence message. Does not implicitly {@link tensorflow.magenta.NoteSequence.verify|verify} messages.
             * @function encode
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {tensorflow.magenta.INoteSequence} message NoteSequence message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NoteSequence.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.filename != null && message.hasOwnProperty("filename"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.filename);
                if (message.collectionName != null && message.hasOwnProperty("collectionName"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.collectionName);
                if (message.ticksPerQuarter != null && message.hasOwnProperty("ticksPerQuarter"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ticksPerQuarter);
                if (message.timeSignatures != null && message.timeSignatures.length)
                    for (var i = 0; i < message.timeSignatures.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.TimeSignature.encode(message.timeSignatures[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.keySignatures != null && message.keySignatures.length)
                    for (var i = 0; i < message.keySignatures.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.KeySignature.encode(message.keySignatures[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.tempos != null && message.tempos.length)
                    for (var i = 0; i < message.tempos.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.Tempo.encode(message.tempos[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.notes != null && message.notes.length)
                    for (var i = 0; i < message.notes.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.Note.encode(message.notes[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.totalTime != null && message.hasOwnProperty("totalTime"))
                    writer.uint32(/* id 9, wireType 1 =*/73).double(message.totalTime);
                if (message.pitchBends != null && message.pitchBends.length)
                    for (var i = 0; i < message.pitchBends.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.PitchBend.encode(message.pitchBends[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                if (message.controlChanges != null && message.controlChanges.length)
                    for (var i = 0; i < message.controlChanges.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.ControlChange.encode(message.controlChanges[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.partInfos != null && message.partInfos.length)
                    for (var i = 0; i < message.partInfos.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.PartInfo.encode(message.partInfos[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                if (message.sourceInfo != null && message.hasOwnProperty("sourceInfo"))
                    $root.tensorflow.magenta.NoteSequence.SourceInfo.encode(message.sourceInfo, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                if (message.textAnnotations != null && message.textAnnotations.length)
                    for (var i = 0; i < message.textAnnotations.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.TextAnnotation.encode(message.textAnnotations[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                if (message.quantizationInfo != null && message.hasOwnProperty("quantizationInfo"))
                    $root.tensorflow.magenta.NoteSequence.QuantizationInfo.encode(message.quantizationInfo, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                if (message.totalQuantizedSteps != null && message.hasOwnProperty("totalQuantizedSteps"))
                    writer.uint32(/* id 16, wireType 0 =*/128).int64(message.totalQuantizedSteps);
                if (message.subsequenceInfo != null && message.hasOwnProperty("subsequenceInfo"))
                    $root.tensorflow.magenta.NoteSequence.SubsequenceInfo.encode(message.subsequenceInfo, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                if (message.referenceNumber != null && message.hasOwnProperty("referenceNumber"))
                    writer.uint32(/* id 18, wireType 0 =*/144).int64(message.referenceNumber);
                if (message.sequenceMetadata != null && message.hasOwnProperty("sequenceMetadata"))
                    $root.tensorflow.magenta.SequenceMetadata.encode(message.sequenceMetadata, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
                if (message.sectionAnnotations != null && message.sectionAnnotations.length)
                    for (var i = 0; i < message.sectionAnnotations.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.SectionAnnotation.encode(message.sectionAnnotations[i], writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                if (message.sectionGroups != null && message.sectionGroups.length)
                    for (var i = 0; i < message.sectionGroups.length; ++i)
                        $root.tensorflow.magenta.NoteSequence.SectionGroup.encode(message.sectionGroups[i], writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified NoteSequence message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.verify|verify} messages.
             * @function encodeDelimited
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {tensorflow.magenta.INoteSequence} message NoteSequence message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NoteSequence.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NoteSequence message from the specified reader or buffer.
             * @function decode
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tensorflow.magenta.NoteSequence} NoteSequence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NoteSequence.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.magenta.NoteSequence();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.filename = reader.string();
                        break;
                    case 18:
                        message.referenceNumber = $util.Long?reader.int64().toNumber():reader.int64();
                        break;
                    case 3:
                        message.collectionName = reader.string();
                        break;
                    case 4:
                        message.ticksPerQuarter = reader.int32();
                        break;
                    case 5:
                        if (!(message.timeSignatures && message.timeSignatures.length))
                            message.timeSignatures = [];
                        message.timeSignatures.push($root.tensorflow.magenta.NoteSequence.TimeSignature.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        if (!(message.keySignatures && message.keySignatures.length))
                            message.keySignatures = [];
                        message.keySignatures.push($root.tensorflow.magenta.NoteSequence.KeySignature.decode(reader, reader.uint32()));
                        break;
                    case 7:
                        if (!(message.tempos && message.tempos.length))
                            message.tempos = [];
                        message.tempos.push($root.tensorflow.magenta.NoteSequence.Tempo.decode(reader, reader.uint32()));
                        break;
                    case 8:
                        if (!(message.notes && message.notes.length))
                            message.notes = [];
                        message.notes.push($root.tensorflow.magenta.NoteSequence.Note.decode(reader, reader.uint32()));
                        break;
                    case 9:
                        message.totalTime = reader.double();
                        break;
                    case 16:
                        message.totalQuantizedSteps = $util.Long?reader.int64().toNumber():reader.int64();
                        break;
                    case 10:
                        if (!(message.pitchBends && message.pitchBends.length))
                            message.pitchBends = [];
                        message.pitchBends.push($root.tensorflow.magenta.NoteSequence.PitchBend.decode(reader, reader.uint32()));
                        break;
                    case 11:
                        if (!(message.controlChanges && message.controlChanges.length))
                            message.controlChanges = [];
                        message.controlChanges.push($root.tensorflow.magenta.NoteSequence.ControlChange.decode(reader, reader.uint32()));
                        break;
                    case 12:
                        if (!(message.partInfos && message.partInfos.length))
                            message.partInfos = [];
                        message.partInfos.push($root.tensorflow.magenta.NoteSequence.PartInfo.decode(reader, reader.uint32()));
                        break;
                    case 13:
                        message.sourceInfo = $root.tensorflow.magenta.NoteSequence.SourceInfo.decode(reader, reader.uint32());
                        break;
                    case 14:
                        if (!(message.textAnnotations && message.textAnnotations.length))
                            message.textAnnotations = [];
                        message.textAnnotations.push($root.tensorflow.magenta.NoteSequence.TextAnnotation.decode(reader, reader.uint32()));
                        break;
                    case 20:
                        if (!(message.sectionAnnotations && message.sectionAnnotations.length))
                            message.sectionAnnotations = [];
                        message.sectionAnnotations.push($root.tensorflow.magenta.NoteSequence.SectionAnnotation.decode(reader, reader.uint32()));
                        break;
                    case 21:
                        if (!(message.sectionGroups && message.sectionGroups.length))
                            message.sectionGroups = [];
                        message.sectionGroups.push($root.tensorflow.magenta.NoteSequence.SectionGroup.decode(reader, reader.uint32()));
                        break;
                    case 15:
                        message.quantizationInfo = $root.tensorflow.magenta.NoteSequence.QuantizationInfo.decode(reader, reader.uint32());
                        break;
                    case 17:
                        message.subsequenceInfo = $root.tensorflow.magenta.NoteSequence.SubsequenceInfo.decode(reader, reader.uint32());
                        break;
                    case 19:
                        message.sequenceMetadata = $root.tensorflow.magenta.SequenceMetadata.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NoteSequence message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {tensorflow.magenta.NoteSequence} NoteSequence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NoteSequence.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NoteSequence message.
             * @function verify
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NoteSequence.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.filename != null && message.hasOwnProperty("filename"))
                    if (!$util.isString(message.filename))
                        return "filename: string expected";
                if (message.referenceNumber != null && message.hasOwnProperty("referenceNumber"))
                    if (!$util.isInteger(message.referenceNumber) && !(message.referenceNumber && $util.isInteger(message.referenceNumber.low) && $util.isInteger(message.referenceNumber.high)))
                        return "referenceNumber: integer|Long expected";
                if (message.collectionName != null && message.hasOwnProperty("collectionName"))
                    if (!$util.isString(message.collectionName))
                        return "collectionName: string expected";
                if (message.ticksPerQuarter != null && message.hasOwnProperty("ticksPerQuarter"))
                    if (!$util.isInteger(message.ticksPerQuarter))
                        return "ticksPerQuarter: integer expected";
                if (message.timeSignatures != null && message.hasOwnProperty("timeSignatures")) {
                    if (!Array.isArray(message.timeSignatures))
                        return "timeSignatures: array expected";
                    for (var i = 0; i < message.timeSignatures.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.TimeSignature.verify(message.timeSignatures[i]);
                        if (error)
                            return "timeSignatures." + error;
                    }
                }
                if (message.keySignatures != null && message.hasOwnProperty("keySignatures")) {
                    if (!Array.isArray(message.keySignatures))
                        return "keySignatures: array expected";
                    for (var i = 0; i < message.keySignatures.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.KeySignature.verify(message.keySignatures[i]);
                        if (error)
                            return "keySignatures." + error;
                    }
                }
                if (message.tempos != null && message.hasOwnProperty("tempos")) {
                    if (!Array.isArray(message.tempos))
                        return "tempos: array expected";
                    for (var i = 0; i < message.tempos.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.Tempo.verify(message.tempos[i]);
                        if (error)
                            return "tempos." + error;
                    }
                }
                if (message.notes != null && message.hasOwnProperty("notes")) {
                    if (!Array.isArray(message.notes))
                        return "notes: array expected";
                    for (var i = 0; i < message.notes.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.Note.verify(message.notes[i]);
                        if (error)
                            return "notes." + error;
                    }
                }
                if (message.totalTime != null && message.hasOwnProperty("totalTime"))
                    if (typeof message.totalTime !== "number")
                        return "totalTime: number expected";
                if (message.totalQuantizedSteps != null && message.hasOwnProperty("totalQuantizedSteps"))
                    if (!$util.isInteger(message.totalQuantizedSteps) && !(message.totalQuantizedSteps && $util.isInteger(message.totalQuantizedSteps.low) && $util.isInteger(message.totalQuantizedSteps.high)))
                        return "totalQuantizedSteps: integer|Long expected";
                if (message.pitchBends != null && message.hasOwnProperty("pitchBends")) {
                    if (!Array.isArray(message.pitchBends))
                        return "pitchBends: array expected";
                    for (var i = 0; i < message.pitchBends.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.PitchBend.verify(message.pitchBends[i]);
                        if (error)
                            return "pitchBends." + error;
                    }
                }
                if (message.controlChanges != null && message.hasOwnProperty("controlChanges")) {
                    if (!Array.isArray(message.controlChanges))
                        return "controlChanges: array expected";
                    for (var i = 0; i < message.controlChanges.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.ControlChange.verify(message.controlChanges[i]);
                        if (error)
                            return "controlChanges." + error;
                    }
                }
                if (message.partInfos != null && message.hasOwnProperty("partInfos")) {
                    if (!Array.isArray(message.partInfos))
                        return "partInfos: array expected";
                    for (var i = 0; i < message.partInfos.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.PartInfo.verify(message.partInfos[i]);
                        if (error)
                            return "partInfos." + error;
                    }
                }
                if (message.sourceInfo != null && message.hasOwnProperty("sourceInfo")) {
                    var error = $root.tensorflow.magenta.NoteSequence.SourceInfo.verify(message.sourceInfo);
                    if (error)
                        return "sourceInfo." + error;
                }
                if (message.textAnnotations != null && message.hasOwnProperty("textAnnotations")) {
                    if (!Array.isArray(message.textAnnotations))
                        return "textAnnotations: array expected";
                    for (var i = 0; i < message.textAnnotations.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.TextAnnotation.verify(message.textAnnotations[i]);
                        if (error)
                            return "textAnnotations." + error;
                    }
                }
                if (message.sectionAnnotations != null && message.hasOwnProperty("sectionAnnotations")) {
                    if (!Array.isArray(message.sectionAnnotations))
                        return "sectionAnnotations: array expected";
                    for (var i = 0; i < message.sectionAnnotations.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.SectionAnnotation.verify(message.sectionAnnotations[i]);
                        if (error)
                            return "sectionAnnotations." + error;
                    }
                }
                if (message.sectionGroups != null && message.hasOwnProperty("sectionGroups")) {
                    if (!Array.isArray(message.sectionGroups))
                        return "sectionGroups: array expected";
                    for (var i = 0; i < message.sectionGroups.length; ++i) {
                        var error = $root.tensorflow.magenta.NoteSequence.SectionGroup.verify(message.sectionGroups[i]);
                        if (error)
                            return "sectionGroups." + error;
                    }
                }
                if (message.quantizationInfo != null && message.hasOwnProperty("quantizationInfo")) {
                    var error = $root.tensorflow.magenta.NoteSequence.QuantizationInfo.verify(message.quantizationInfo);
                    if (error)
                        return "quantizationInfo." + error;
                }
                if (message.subsequenceInfo != null && message.hasOwnProperty("subsequenceInfo")) {
                    var error = $root.tensorflow.magenta.NoteSequence.SubsequenceInfo.verify(message.subsequenceInfo);
                    if (error)
                        return "subsequenceInfo." + error;
                }
                if (message.sequenceMetadata != null && message.hasOwnProperty("sequenceMetadata")) {
                    var error = $root.tensorflow.magenta.SequenceMetadata.verify(message.sequenceMetadata);
                    if (error)
                        return "sequenceMetadata." + error;
                }
                return null;
            };

            /**
             * Creates a NoteSequence message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tensorflow.magenta.NoteSequence} NoteSequence
             */
            NoteSequence.fromObject = function fromObject(object) {
                if (object instanceof $root.tensorflow.magenta.NoteSequence)
                    return object;
                var message = new $root.tensorflow.magenta.NoteSequence();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.filename != null)
                    message.filename = String(object.filename);
                if (object.referenceNumber != null)
                    if ($util.Long)
                        (message.referenceNumber = $util.Long.fromValue(object.referenceNumber)).unsigned = false;
                    else if (typeof object.referenceNumber === "string")
                        message.referenceNumber = parseInt(object.referenceNumber, 10);
                    else if (typeof object.referenceNumber === "number")
                        message.referenceNumber = object.referenceNumber;
                    else if (typeof object.referenceNumber === "object")
                        message.referenceNumber = new $util.LongBits(object.referenceNumber.low >>> 0, object.referenceNumber.high >>> 0).toNumber();
                if (object.collectionName != null)
                    message.collectionName = String(object.collectionName);
                if (object.ticksPerQuarter != null)
                    message.ticksPerQuarter = object.ticksPerQuarter | 0;
                if (object.timeSignatures) {
                    if (!Array.isArray(object.timeSignatures))
                        throw TypeError(".tensorflow.magenta.NoteSequence.timeSignatures: array expected");
                    message.timeSignatures = [];
                    for (var i = 0; i < object.timeSignatures.length; ++i) {
                        if (typeof object.timeSignatures[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.timeSignatures: object expected");
                        message.timeSignatures[i] = $root.tensorflow.magenta.NoteSequence.TimeSignature.fromObject(object.timeSignatures[i]);
                    }
                }
                if (object.keySignatures) {
                    if (!Array.isArray(object.keySignatures))
                        throw TypeError(".tensorflow.magenta.NoteSequence.keySignatures: array expected");
                    message.keySignatures = [];
                    for (var i = 0; i < object.keySignatures.length; ++i) {
                        if (typeof object.keySignatures[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.keySignatures: object expected");
                        message.keySignatures[i] = $root.tensorflow.magenta.NoteSequence.KeySignature.fromObject(object.keySignatures[i]);
                    }
                }
                if (object.tempos) {
                    if (!Array.isArray(object.tempos))
                        throw TypeError(".tensorflow.magenta.NoteSequence.tempos: array expected");
                    message.tempos = [];
                    for (var i = 0; i < object.tempos.length; ++i) {
                        if (typeof object.tempos[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.tempos: object expected");
                        message.tempos[i] = $root.tensorflow.magenta.NoteSequence.Tempo.fromObject(object.tempos[i]);
                    }
                }
                if (object.notes) {
                    if (!Array.isArray(object.notes))
                        throw TypeError(".tensorflow.magenta.NoteSequence.notes: array expected");
                    message.notes = [];
                    for (var i = 0; i < object.notes.length; ++i) {
                        if (typeof object.notes[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.notes: object expected");
                        message.notes[i] = $root.tensorflow.magenta.NoteSequence.Note.fromObject(object.notes[i]);
                    }
                }
                if (object.totalTime != null)
                    message.totalTime = Number(object.totalTime);
                if (object.totalQuantizedSteps != null)
                    if ($util.Long)
                        (message.totalQuantizedSteps = $util.Long.fromValue(object.totalQuantizedSteps)).unsigned = false;
                    else if (typeof object.totalQuantizedSteps === "string")
                        message.totalQuantizedSteps = parseInt(object.totalQuantizedSteps, 10);
                    else if (typeof object.totalQuantizedSteps === "number")
                        message.totalQuantizedSteps = object.totalQuantizedSteps;
                    else if (typeof object.totalQuantizedSteps === "object")
                        message.totalQuantizedSteps = new $util.LongBits(object.totalQuantizedSteps.low >>> 0, object.totalQuantizedSteps.high >>> 0).toNumber();
                if (object.pitchBends) {
                    if (!Array.isArray(object.pitchBends))
                        throw TypeError(".tensorflow.magenta.NoteSequence.pitchBends: array expected");
                    message.pitchBends = [];
                    for (var i = 0; i < object.pitchBends.length; ++i) {
                        if (typeof object.pitchBends[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.pitchBends: object expected");
                        message.pitchBends[i] = $root.tensorflow.magenta.NoteSequence.PitchBend.fromObject(object.pitchBends[i]);
                    }
                }
                if (object.controlChanges) {
                    if (!Array.isArray(object.controlChanges))
                        throw TypeError(".tensorflow.magenta.NoteSequence.controlChanges: array expected");
                    message.controlChanges = [];
                    for (var i = 0; i < object.controlChanges.length; ++i) {
                        if (typeof object.controlChanges[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.controlChanges: object expected");
                        message.controlChanges[i] = $root.tensorflow.magenta.NoteSequence.ControlChange.fromObject(object.controlChanges[i]);
                    }
                }
                if (object.partInfos) {
                    if (!Array.isArray(object.partInfos))
                        throw TypeError(".tensorflow.magenta.NoteSequence.partInfos: array expected");
                    message.partInfos = [];
                    for (var i = 0; i < object.partInfos.length; ++i) {
                        if (typeof object.partInfos[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.partInfos: object expected");
                        message.partInfos[i] = $root.tensorflow.magenta.NoteSequence.PartInfo.fromObject(object.partInfos[i]);
                    }
                }
                if (object.sourceInfo != null) {
                    if (typeof object.sourceInfo !== "object")
                        throw TypeError(".tensorflow.magenta.NoteSequence.sourceInfo: object expected");
                    message.sourceInfo = $root.tensorflow.magenta.NoteSequence.SourceInfo.fromObject(object.sourceInfo);
                }
                if (object.textAnnotations) {
                    if (!Array.isArray(object.textAnnotations))
                        throw TypeError(".tensorflow.magenta.NoteSequence.textAnnotations: array expected");
                    message.textAnnotations = [];
                    for (var i = 0; i < object.textAnnotations.length; ++i) {
                        if (typeof object.textAnnotations[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.textAnnotations: object expected");
                        message.textAnnotations[i] = $root.tensorflow.magenta.NoteSequence.TextAnnotation.fromObject(object.textAnnotations[i]);
                    }
                }
                if (object.sectionAnnotations) {
                    if (!Array.isArray(object.sectionAnnotations))
                        throw TypeError(".tensorflow.magenta.NoteSequence.sectionAnnotations: array expected");
                    message.sectionAnnotations = [];
                    for (var i = 0; i < object.sectionAnnotations.length; ++i) {
                        if (typeof object.sectionAnnotations[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.sectionAnnotations: object expected");
                        message.sectionAnnotations[i] = $root.tensorflow.magenta.NoteSequence.SectionAnnotation.fromObject(object.sectionAnnotations[i]);
                    }
                }
                if (object.sectionGroups) {
                    if (!Array.isArray(object.sectionGroups))
                        throw TypeError(".tensorflow.magenta.NoteSequence.sectionGroups: array expected");
                    message.sectionGroups = [];
                    for (var i = 0; i < object.sectionGroups.length; ++i) {
                        if (typeof object.sectionGroups[i] !== "object")
                            throw TypeError(".tensorflow.magenta.NoteSequence.sectionGroups: object expected");
                        message.sectionGroups[i] = $root.tensorflow.magenta.NoteSequence.SectionGroup.fromObject(object.sectionGroups[i]);
                    }
                }
                if (object.quantizationInfo != null) {
                    if (typeof object.quantizationInfo !== "object")
                        throw TypeError(".tensorflow.magenta.NoteSequence.quantizationInfo: object expected");
                    message.quantizationInfo = $root.tensorflow.magenta.NoteSequence.QuantizationInfo.fromObject(object.quantizationInfo);
                }
                if (object.subsequenceInfo != null) {
                    if (typeof object.subsequenceInfo !== "object")
                        throw TypeError(".tensorflow.magenta.NoteSequence.subsequenceInfo: object expected");
                    message.subsequenceInfo = $root.tensorflow.magenta.NoteSequence.SubsequenceInfo.fromObject(object.subsequenceInfo);
                }
                if (object.sequenceMetadata != null) {
                    if (typeof object.sequenceMetadata !== "object")
                        throw TypeError(".tensorflow.magenta.NoteSequence.sequenceMetadata: object expected");
                    message.sequenceMetadata = $root.tensorflow.magenta.SequenceMetadata.fromObject(object.sequenceMetadata);
                }
                return message;
            };

            /**
             * Creates a plain object from a NoteSequence message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tensorflow.magenta.NoteSequence
             * @static
             * @param {tensorflow.magenta.NoteSequence} message NoteSequence
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NoteSequence.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.timeSignatures = [];
                    object.keySignatures = [];
                    object.tempos = [];
                    object.notes = [];
                    object.pitchBends = [];
                    object.controlChanges = [];
                    object.partInfos = [];
                    object.textAnnotations = [];
                    object.sectionAnnotations = [];
                    object.sectionGroups = [];
                }
                if (options.defaults) {
                    object.id = "";
                    object.filename = "";
                    object.collectionName = "";
                    object.ticksPerQuarter = 0;
                    object.totalTime = 0;
                    object.sourceInfo = null;
                    object.quantizationInfo = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.totalQuantizedSteps = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.totalQuantizedSteps = options.longs === String ? "0" : 0;
                    object.subsequenceInfo = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.referenceNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.referenceNumber = options.longs === String ? "0" : 0;
                    object.sequenceMetadata = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.filename != null && message.hasOwnProperty("filename"))
                    object.filename = message.filename;
                if (message.collectionName != null && message.hasOwnProperty("collectionName"))
                    object.collectionName = message.collectionName;
                if (message.ticksPerQuarter != null && message.hasOwnProperty("ticksPerQuarter"))
                    object.ticksPerQuarter = message.ticksPerQuarter;
                if (message.timeSignatures && message.timeSignatures.length) {
                    object.timeSignatures = [];
                    for (var j = 0; j < message.timeSignatures.length; ++j)
                        object.timeSignatures[j] = $root.tensorflow.magenta.NoteSequence.TimeSignature.toObject(message.timeSignatures[j], options);
                }
                if (message.keySignatures && message.keySignatures.length) {
                    object.keySignatures = [];
                    for (var j = 0; j < message.keySignatures.length; ++j)
                        object.keySignatures[j] = $root.tensorflow.magenta.NoteSequence.KeySignature.toObject(message.keySignatures[j], options);
                }
                if (message.tempos && message.tempos.length) {
                    object.tempos = [];
                    for (var j = 0; j < message.tempos.length; ++j)
                        object.tempos[j] = $root.tensorflow.magenta.NoteSequence.Tempo.toObject(message.tempos[j], options);
                }
                if (message.notes && message.notes.length) {
                    object.notes = [];
                    for (var j = 0; j < message.notes.length; ++j)
                        object.notes[j] = $root.tensorflow.magenta.NoteSequence.Note.toObject(message.notes[j], options);
                }
                if (message.totalTime != null && message.hasOwnProperty("totalTime"))
                    object.totalTime = options.json && !isFinite(message.totalTime) ? String(message.totalTime) : message.totalTime;
                if (message.pitchBends && message.pitchBends.length) {
                    object.pitchBends = [];
                    for (var j = 0; j < message.pitchBends.length; ++j)
                        object.pitchBends[j] = $root.tensorflow.magenta.NoteSequence.PitchBend.toObject(message.pitchBends[j], options);
                }
                if (message.controlChanges && message.controlChanges.length) {
                    object.controlChanges = [];
                    for (var j = 0; j < message.controlChanges.length; ++j)
                        object.controlChanges[j] = $root.tensorflow.magenta.NoteSequence.ControlChange.toObject(message.controlChanges[j], options);
                }
                if (message.partInfos && message.partInfos.length) {
                    object.partInfos = [];
                    for (var j = 0; j < message.partInfos.length; ++j)
                        object.partInfos[j] = $root.tensorflow.magenta.NoteSequence.PartInfo.toObject(message.partInfos[j], options);