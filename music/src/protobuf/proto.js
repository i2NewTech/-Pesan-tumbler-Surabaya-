
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
                }
                if (message.sourceInfo != null && message.hasOwnProperty("sourceInfo"))
                    object.sourceInfo = $root.tensorflow.magenta.NoteSequence.SourceInfo.toObject(message.sourceInfo, options);
                if (message.textAnnotations && message.textAnnotations.length) {
                    object.textAnnotations = [];
                    for (var j = 0; j < message.textAnnotations.length; ++j)
                        object.textAnnotations[j] = $root.tensorflow.magenta.NoteSequence.TextAnnotation.toObject(message.textAnnotations[j], options);
                }
                if (message.quantizationInfo != null && message.hasOwnProperty("quantizationInfo"))
                    object.quantizationInfo = $root.tensorflow.magenta.NoteSequence.QuantizationInfo.toObject(message.quantizationInfo, options);
                if (message.totalQuantizedSteps != null && message.hasOwnProperty("totalQuantizedSteps"))
                    if (typeof message.totalQuantizedSteps === "number")
                        object.totalQuantizedSteps = options.longs === String ? String(message.totalQuantizedSteps) : message.totalQuantizedSteps;
                    else
                        object.totalQuantizedSteps = options.longs === String ? $util.Long.prototype.toString.call(message.totalQuantizedSteps) : options.longs === Number ? new $util.LongBits(message.totalQuantizedSteps.low >>> 0, message.totalQuantizedSteps.high >>> 0).toNumber() : message.totalQuantizedSteps;
                if (message.subsequenceInfo != null && message.hasOwnProperty("subsequenceInfo"))
                    object.subsequenceInfo = $root.tensorflow.magenta.NoteSequence.SubsequenceInfo.toObject(message.subsequenceInfo, options);
                if (message.referenceNumber != null && message.hasOwnProperty("referenceNumber"))
                    if (typeof message.referenceNumber === "number")
                        object.referenceNumber = options.longs === String ? String(message.referenceNumber) : message.referenceNumber;
                    else
                        object.referenceNumber = options.longs === String ? $util.Long.prototype.toString.call(message.referenceNumber) : options.longs === Number ? new $util.LongBits(message.referenceNumber.low >>> 0, message.referenceNumber.high >>> 0).toNumber() : message.referenceNumber;
                if (message.sequenceMetadata != null && message.hasOwnProperty("sequenceMetadata"))
                    object.sequenceMetadata = $root.tensorflow.magenta.SequenceMetadata.toObject(message.sequenceMetadata, options);
                if (message.sectionAnnotations && message.sectionAnnotations.length) {
                    object.sectionAnnotations = [];
                    for (var j = 0; j < message.sectionAnnotations.length; ++j)
                        object.sectionAnnotations[j] = $root.tensorflow.magenta.NoteSequence.SectionAnnotation.toObject(message.sectionAnnotations[j], options);
                }
                if (message.sectionGroups && message.sectionGroups.length) {
                    object.sectionGroups = [];
                    for (var j = 0; j < message.sectionGroups.length; ++j)
                        object.sectionGroups[j] = $root.tensorflow.magenta.NoteSequence.SectionGroup.toObject(message.sectionGroups[j], options);
                }
                return object;
            };

            /**
             * Converts this NoteSequence to JSON.
             * @function toJSON
             * @memberof tensorflow.magenta.NoteSequence
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NoteSequence.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            NoteSequence.Note = (function() {

                /**
                 * Properties of a Note.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @interface INote
                 * @property {number|null} [pitch] Note pitch
                 * @property {tensorflow.magenta.NoteSequence.PitchName|null} [pitchName] Note pitchName
                 * @property {number|null} [velocity] Note velocity
                 * @property {number|null} [startTime] Note startTime
                 * @property {number|null} [quantizedStartStep] Note quantizedStartStep
                 * @property {number|null} [endTime] Note endTime
                 * @property {number|null} [quantizedEndStep] Note quantizedEndStep
                 * @property {number|null} [numerator] Note numerator
                 * @property {number|null} [denominator] Note denominator
                 * @property {number|null} [instrument] Note instrument
                 * @property {number|null} [program] Note program
                 * @property {boolean|null} [isDrum] Note isDrum
                 * @property {number|null} [part] Note part
                 * @property {number|null} [voice] Note voice
                 */

                /**
                 * Constructs a new Note.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @classdesc Represents a Note.
                 * @implements INote
                 * @constructor
                 * @param {tensorflow.magenta.NoteSequence.INote=} [properties] Properties to set
                 */
                function Note(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Note pitch.
                 * @member {number} pitch
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.pitch = 0;

                /**
                 * Note pitchName.
                 * @member {tensorflow.magenta.NoteSequence.PitchName} pitchName
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.pitchName = 0;

                /**
                 * Note velocity.
                 * @member {number} velocity
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.velocity = 0;

                /**
                 * Note startTime.
                 * @member {number} startTime
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.startTime = 0;

                /**
                 * Note quantizedStartStep.
                 * @member {number} quantizedStartStep
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.quantizedStartStep = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Note endTime.
                 * @member {number} endTime
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.endTime = 0;

                /**
                 * Note quantizedEndStep.
                 * @member {number} quantizedEndStep
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.quantizedEndStep = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Note numerator.
                 * @member {number} numerator
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.numerator = 0;

                /**
                 * Note denominator.
                 * @member {number} denominator
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.denominator = 0;

                /**
                 * Note instrument.
                 * @member {number} instrument
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.instrument = 0;

                /**
                 * Note program.
                 * @member {number} program
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.program = 0;

                /**
                 * Note isDrum.
                 * @member {boolean} isDrum
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.isDrum = false;

                /**
                 * Note part.
                 * @member {number} part
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.part = 0;

                /**
                 * Note voice.
                 * @member {number} voice
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 */
                Note.prototype.voice = 0;

                /**
                 * Creates a new Note instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.INote=} [properties] Properties to set
                 * @returns {tensorflow.magenta.NoteSequence.Note} Note instance
                 */
                Note.create = function create(properties) {
                    return new Note(properties);
                };

                /**
                 * Encodes the specified Note message. Does not implicitly {@link tensorflow.magenta.NoteSequence.Note.verify|verify} messages.
                 * @function encode
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.INote} message Note message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Note.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.pitch != null && message.hasOwnProperty("pitch"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.pitch);
                    if (message.velocity != null && message.hasOwnProperty("velocity"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.velocity);
                    if (message.startTime != null && message.hasOwnProperty("startTime"))
                        writer.uint32(/* id 3, wireType 1 =*/25).double(message.startTime);
                    if (message.endTime != null && message.hasOwnProperty("endTime"))
                        writer.uint32(/* id 4, wireType 1 =*/33).double(message.endTime);
                    if (message.numerator != null && message.hasOwnProperty("numerator"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.numerator);
                    if (message.denominator != null && message.hasOwnProperty("denominator"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.denominator);
                    if (message.instrument != null && message.hasOwnProperty("instrument"))
                        writer.uint32(/* id 7, wireType 0 =*/56).int32(message.instrument);
                    if (message.program != null && message.hasOwnProperty("program"))
                        writer.uint32(/* id 8, wireType 0 =*/64).int32(message.program);
                    if (message.isDrum != null && message.hasOwnProperty("isDrum"))
                        writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isDrum);
                    if (message.part != null && message.hasOwnProperty("part"))
                        writer.uint32(/* id 10, wireType 0 =*/80).int32(message.part);
                    if (message.pitchName != null && message.hasOwnProperty("pitchName"))
                        writer.uint32(/* id 11, wireType 0 =*/88).int32(message.pitchName);
                    if (message.voice != null && message.hasOwnProperty("voice"))
                        writer.uint32(/* id 12, wireType 0 =*/96).int32(message.voice);
                    if (message.quantizedStartStep != null && message.hasOwnProperty("quantizedStartStep"))
                        writer.uint32(/* id 13, wireType 0 =*/104).int64(message.quantizedStartStep);
                    if (message.quantizedEndStep != null && message.hasOwnProperty("quantizedEndStep"))
                        writer.uint32(/* id 14, wireType 0 =*/112).int64(message.quantizedEndStep);
                    return writer;
                };

                /**
                 * Encodes the specified Note message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.Note.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.INote} message Note message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Note.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Note message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.magenta.NoteSequence.Note} Note
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Note.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.magenta.NoteSequence.Note();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.pitch = reader.int32();
                            break;
                        case 11:
                            message.pitchName = reader.int32();
                            break;
                        case 2:
                            message.velocity = reader.int32();
                            break;
                        case 3:
                            message.startTime = reader.double();
                            break;
                        case 13:
                            message.quantizedStartStep = $util.Long?reader.int64().toNumber():reader.int64();
                            break;
                        case 4:
                            message.endTime = reader.double();
                            break;
                        case 14:
                            message.quantizedEndStep = $util.Long?reader.int64().toNumber():reader.int64();
                            break;
                        case 5:
                            message.numerator = reader.int32();
                            break;
                        case 6:
                            message.denominator = reader.int32();
                            break;
                        case 7:
                            message.instrument = reader.int32();
                            break;
                        case 8:
                            message.program = reader.int32();
                            break;
                        case 9:
                            message.isDrum = reader.bool();
                            break;
                        case 10:
                            message.part = reader.int32();
                            break;
                        case 12:
                            message.voice = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Note message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tensorflow.magenta.NoteSequence.Note} Note
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Note.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Note message.
                 * @function verify
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Note.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.pitch != null && message.hasOwnProperty("pitch"))
                        if (!$util.isInteger(message.pitch))
                            return "pitch: integer expected";
                    if (message.pitchName != null && message.hasOwnProperty("pitchName"))
                        switch (message.pitchName) {
                        default:
                            return "pitchName: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                            break;
                        }
                    if (message.velocity != null && message.hasOwnProperty("velocity"))
                        if (!$util.isInteger(message.velocity))
                            return "velocity: integer expected";
                    if (message.startTime != null && message.hasOwnProperty("startTime"))
                        if (typeof message.startTime !== "number")
                            return "startTime: number expected";
                    if (message.quantizedStartStep != null && message.hasOwnProperty("quantizedStartStep"))
                        if (!$util.isInteger(message.quantizedStartStep) && !(message.quantizedStartStep && $util.isInteger(message.quantizedStartStep.low) && $util.isInteger(message.quantizedStartStep.high)))
                            return "quantizedStartStep: integer|Long expected";
                    if (message.endTime != null && message.hasOwnProperty("endTime"))
                        if (typeof message.endTime !== "number")
                            return "endTime: number expected";
                    if (message.quantizedEndStep != null && message.hasOwnProperty("quantizedEndStep"))
                        if (!$util.isInteger(message.quantizedEndStep) && !(message.quantizedEndStep && $util.isInteger(message.quantizedEndStep.low) && $util.isInteger(message.quantizedEndStep.high)))
                            return "quantizedEndStep: integer|Long expected";
                    if (message.numerator != null && message.hasOwnProperty("numerator"))
                        if (!$util.isInteger(message.numerator))
                            return "numerator: integer expected";
                    if (message.denominator != null && message.hasOwnProperty("denominator"))
                        if (!$util.isInteger(message.denominator))
                            return "denominator: integer expected";
                    if (message.instrument != null && message.hasOwnProperty("instrument"))
                        if (!$util.isInteger(message.instrument))
                            return "instrument: integer expected";
                    if (message.program != null && message.hasOwnProperty("program"))
                        if (!$util.isInteger(message.program))
                            return "program: integer expected";
                    if (message.isDrum != null && message.hasOwnProperty("isDrum"))
                        if (typeof message.isDrum !== "boolean")
                            return "isDrum: boolean expected";
                    if (message.part != null && message.hasOwnProperty("part"))
                        if (!$util.isInteger(message.part))
                            return "part: integer expected";
                    if (message.voice != null && message.hasOwnProperty("voice"))
                        if (!$util.isInteger(message.voice))
                            return "voice: integer expected";
                    return null;
                };

                /**
                 * Creates a Note message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.magenta.NoteSequence.Note} Note
                 */
                Note.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.magenta.NoteSequence.Note)
                        return object;
                    var message = new $root.tensorflow.magenta.NoteSequence.Note();
                    if (object.pitch != null)
                        message.pitch = object.pitch | 0;
                    switch (object.pitchName) {
                    case "UNKNOWN_PITCH_NAME":
                    case 0:
                        message.pitchName = 0;
                        break;
                    case "F_FLAT_FLAT":
                    case 1:
                        message.pitchName = 1;
                        break;
                    case "C_FLAT_FLAT":
                    case 2:
                        message.pitchName = 2;
                        break;
                    case "G_FLAT_FLAT":
                    case 3:
                        message.pitchName = 3;
                        break;
                    case "D_FLAT_FLAT":
                    case 4:
                        message.pitchName = 4;
                        break;
                    case "A_FLAT_FLAT":
                    case 5:
                        message.pitchName = 5;
                        break;
                    case "E_FLAT_FLAT":
                    case 6:
                        message.pitchName = 6;
                        break;
                    case "B_FLAT_FLAT":
                    case 7:
                        message.pitchName = 7;
                        break;
                    case "F_FLAT":
                    case 8:
                        message.pitchName = 8;
                        break;
                    case "C_FLAT":
                    case 9:
                        message.pitchName = 9;
                        break;
                    case "G_FLAT":
                    case 10:
                        message.pitchName = 10;
                        break;
                    case "D_FLAT":
                    case 11:
                        message.pitchName = 11;
                        break;
                    case "A_FLAT":
                    case 12:
                        message.pitchName = 12;
                        break;
                    case "E_FLAT":
                    case 13:
                        message.pitchName = 13;
                        break;
                    case "B_FLAT":
                    case 14:
                        message.pitchName = 14;
                        break;
                    case "F":
                    case 15:
                        message.pitchName = 15;
                        break;
                    case "C":
                    case 16:
                        message.pitchName = 16;
                        break;
                    case "G":
                    case 17:
                        message.pitchName = 17;
                        break;
                    case "D":
                    case 18:
                        message.pitchName = 18;
                        break;
                    case "A":
                    case 19:
                        message.pitchName = 19;
                        break;
                    case "E":
                    case 20:
                        message.pitchName = 20;
                        break;
                    case "B":
                    case 21:
                        message.pitchName = 21;
                        break;
                    case "F_SHARP":
                    case 22:
                        message.pitchName = 22;
                        break;
                    case "C_SHARP":
                    case 23:
                        message.pitchName = 23;
                        break;
                    case "G_SHARP":
                    case 24:
                        message.pitchName = 24;
                        break;
                    case "D_SHARP":
                    case 25:
                        message.pitchName = 25;
                        break;
                    case "A_SHARP":
                    case 26:
                        message.pitchName = 26;
                        break;
                    case "E_SHARP":
                    case 27:
                        message.pitchName = 27;
                        break;
                    case "B_SHARP":
                    case 28:
                        message.pitchName = 28;
                        break;
                    case "F_SHARP_SHARP":
                    case 29:
                        message.pitchName = 29;
                        break;
                    case "C_SHARP_SHARP":
                    case 30:
                        message.pitchName = 30;
                        break;
                    case "G_SHARP_SHARP":
                    case 31:
                        message.pitchName = 31;
                        break;
                    case "D_SHARP_SHARP":
                    case 32:
                        message.pitchName = 32;
                        break;
                    case "A_SHARP_SHARP":
                    case 33:
                        message.pitchName = 33;
                        break;
                    case "E_SHARP_SHARP":
                    case 34:
                        message.pitchName = 34;
                        break;
                    case "B_SHARP_SHARP":
                    case 35:
                        message.pitchName = 35;
                        break;
                    }
                    if (object.velocity != null)
                        message.velocity = object.velocity | 0;
                    if (object.startTime != null)
                        message.startTime = Number(object.startTime);
                    if (object.quantizedStartStep != null)
                        if ($util.Long)
                            (message.quantizedStartStep = $util.Long.fromValue(object.quantizedStartStep)).unsigned = false;
                        else if (typeof object.quantizedStartStep === "string")
                            message.quantizedStartStep = parseInt(object.quantizedStartStep, 10);
                        else if (typeof object.quantizedStartStep === "number")
                            message.quantizedStartStep = object.quantizedStartStep;
                        else if (typeof object.quantizedStartStep === "object")
                            message.quantizedStartStep = new $util.LongBits(object.quantizedStartStep.low >>> 0, object.quantizedStartStep.high >>> 0).toNumber();
                    if (object.endTime != null)
                        message.endTime = Number(object.endTime);
                    if (object.quantizedEndStep != null)
                        if ($util.Long)
                            (message.quantizedEndStep = $util.Long.fromValue(object.quantizedEndStep)).unsigned = false;
                        else if (typeof object.quantizedEndStep === "string")
                            message.quantizedEndStep = parseInt(object.quantizedEndStep, 10);
                        else if (typeof object.quantizedEndStep === "number")
                            message.quantizedEndStep = object.quantizedEndStep;
                        else if (typeof object.quantizedEndStep === "object")
                            message.quantizedEndStep = new $util.LongBits(object.quantizedEndStep.low >>> 0, object.quantizedEndStep.high >>> 0).toNumber();
                    if (object.numerator != null)
                        message.numerator = object.numerator | 0;
                    if (object.denominator != null)
                        message.denominator = object.denominator | 0;
                    if (object.instrument != null)
                        message.instrument = object.instrument | 0;
                    if (object.program != null)
                        message.program = object.program | 0;
                    if (object.isDrum != null)
                        message.isDrum = Boolean(object.isDrum);
                    if (object.part != null)
                        message.part = object.part | 0;
                    if (object.voice != null)
                        message.voice = object.voice | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Note message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.Note} message Note
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Note.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.pitch = 0;
                        object.velocity = 0;
                        object.startTime = 0;
                        object.endTime = 0;
                        object.numerator = 0;
                        object.denominator = 0;
                        object.instrument = 0;
                        object.program = 0;
                        object.isDrum = false;
                        object.part = 0;
                        object.pitchName = options.enums === String ? "UNKNOWN_PITCH_NAME" : 0;
                        object.voice = 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.quantizedStartStep = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.quantizedStartStep = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.quantizedEndStep = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.quantizedEndStep = options.longs === String ? "0" : 0;
                    }
                    if (message.pitch != null && message.hasOwnProperty("pitch"))
                        object.pitch = message.pitch;
                    if (message.velocity != null && message.hasOwnProperty("velocity"))
                        object.velocity = message.velocity;
                    if (message.startTime != null && message.hasOwnProperty("startTime"))
                        object.startTime = options.json && !isFinite(message.startTime) ? String(message.startTime) : message.startTime;
                    if (message.endTime != null && message.hasOwnProperty("endTime"))
                        object.endTime = options.json && !isFinite(message.endTime) ? String(message.endTime) : message.endTime;
                    if (message.numerator != null && message.hasOwnProperty("numerator"))
                        object.numerator = message.numerator;
                    if (message.denominator != null && message.hasOwnProperty("denominator"))
                        object.denominator = message.denominator;
                    if (message.instrument != null && message.hasOwnProperty("instrument"))
                        object.instrument = message.instrument;
                    if (message.program != null && message.hasOwnProperty("program"))
                        object.program = message.program;
                    if (message.isDrum != null && message.hasOwnProperty("isDrum"))
                        object.isDrum = message.isDrum;
                    if (message.part != null && message.hasOwnProperty("part"))
                        object.part = message.part;
                    if (message.pitchName != null && message.hasOwnProperty("pitchName"))
                        object.pitchName = options.enums === String ? $root.tensorflow.magenta.NoteSequence.PitchName[message.pitchName] : message.pitchName;
                    if (message.voice != null && message.hasOwnProperty("voice"))
                        object.voice = message.voice;
                    if (message.quantizedStartStep != null && message.hasOwnProperty("quantizedStartStep"))
                        if (typeof message.quantizedStartStep === "number")
                            object.quantizedStartStep = options.longs === String ? String(message.quantizedStartStep) : message.quantizedStartStep;
                        else
                            object.quantizedStartStep = options.longs === String ? $util.Long.prototype.toString.call(message.quantizedStartStep) : options.longs === Number ? new $util.LongBits(message.quantizedStartStep.low >>> 0, message.quantizedStartStep.high >>> 0).toNumber() : message.quantizedStartStep;
                    if (message.quantizedEndStep != null && message.hasOwnProperty("quantizedEndStep"))
                        if (typeof message.quantizedEndStep === "number")
                            object.quantizedEndStep = options.longs === String ? String(message.quantizedEndStep) : message.quantizedEndStep;
                        else
                            object.quantizedEndStep = options.longs === String ? $util.Long.prototype.toString.call(message.quantizedEndStep) : options.longs === Number ? new $util.LongBits(message.quantizedEndStep.low >>> 0, message.quantizedEndStep.high >>> 0).toNumber() : message.quantizedEndStep;
                    return object;
                };

                /**
                 * Converts this Note to JSON.
                 * @function toJSON
                 * @memberof tensorflow.magenta.NoteSequence.Note
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Note.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Note;
            })();

            /**
             * PitchName enum.
             * @name tensorflow.magenta.NoteSequence.PitchName
             * @enum {string}
             * @property {number} UNKNOWN_PITCH_NAME=0 UNKNOWN_PITCH_NAME value
             * @property {number} F_FLAT_FLAT=1 F_FLAT_FLAT value
             * @property {number} C_FLAT_FLAT=2 C_FLAT_FLAT value
             * @property {number} G_FLAT_FLAT=3 G_FLAT_FLAT value
             * @property {number} D_FLAT_FLAT=4 D_FLAT_FLAT value
             * @property {number} A_FLAT_FLAT=5 A_FLAT_FLAT value
             * @property {number} E_FLAT_FLAT=6 E_FLAT_FLAT value
             * @property {number} B_FLAT_FLAT=7 B_FLAT_FLAT value
             * @property {number} F_FLAT=8 F_FLAT value
             * @property {number} C_FLAT=9 C_FLAT value
             * @property {number} G_FLAT=10 G_FLAT value
             * @property {number} D_FLAT=11 D_FLAT value
             * @property {number} A_FLAT=12 A_FLAT value
             * @property {number} E_FLAT=13 E_FLAT value
             * @property {number} B_FLAT=14 B_FLAT value
             * @property {number} F=15 F value
             * @property {number} C=16 C value
             * @property {number} G=17 G value
             * @property {number} D=18 D value
             * @property {number} A=19 A value
             * @property {number} E=20 E value
             * @property {number} B=21 B value
             * @property {number} F_SHARP=22 F_SHARP value
             * @property {number} C_SHARP=23 C_SHARP value
             * @property {number} G_SHARP=24 G_SHARP value
             * @property {number} D_SHARP=25 D_SHARP value
             * @property {number} A_SHARP=26 A_SHARP value
             * @property {number} E_SHARP=27 E_SHARP value
             * @property {number} B_SHARP=28 B_SHARP value
             * @property {number} F_SHARP_SHARP=29 F_SHARP_SHARP value
             * @property {number} C_SHARP_SHARP=30 C_SHARP_SHARP value
             * @property {number} G_SHARP_SHARP=31 G_SHARP_SHARP value
             * @property {number} D_SHARP_SHARP=32 D_SHARP_SHARP value
             * @property {number} A_SHARP_SHARP=33 A_SHARP_SHARP value
             * @property {number} E_SHARP_SHARP=34 E_SHARP_SHARP value
             * @property {number} B_SHARP_SHARP=35 B_SHARP_SHARP value
             */
            NoteSequence.PitchName = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_PITCH_NAME"] = 0;
                values[valuesById[1] = "F_FLAT_FLAT"] = 1;
                values[valuesById[2] = "C_FLAT_FLAT"] = 2;
                values[valuesById[3] = "G_FLAT_FLAT"] = 3;
                values[valuesById[4] = "D_FLAT_FLAT"] = 4;
                values[valuesById[5] = "A_FLAT_FLAT"] = 5;
                values[valuesById[6] = "E_FLAT_FLAT"] = 6;
                values[valuesById[7] = "B_FLAT_FLAT"] = 7;
                values[valuesById[8] = "F_FLAT"] = 8;
                values[valuesById[9] = "C_FLAT"] = 9;
                values[valuesById[10] = "G_FLAT"] = 10;
                values[valuesById[11] = "D_FLAT"] = 11;
                values[valuesById[12] = "A_FLAT"] = 12;
                values[valuesById[13] = "E_FLAT"] = 13;
                values[valuesById[14] = "B_FLAT"] = 14;
                values[valuesById[15] = "F"] = 15;
                values[valuesById[16] = "C"] = 16;
                values[valuesById[17] = "G"] = 17;
                values[valuesById[18] = "D"] = 18;
                values[valuesById[19] = "A"] = 19;
                values[valuesById[20] = "E"] = 20;
                values[valuesById[21] = "B"] = 21;
                values[valuesById[22] = "F_SHARP"] = 22;
                values[valuesById[23] = "C_SHARP"] = 23;
                values[valuesById[24] = "G_SHARP"] = 24;
                values[valuesById[25] = "D_SHARP"] = 25;
                values[valuesById[26] = "A_SHARP"] = 26;
                values[valuesById[27] = "E_SHARP"] = 27;
                values[valuesById[28] = "B_SHARP"] = 28;
                values[valuesById[29] = "F_SHARP_SHARP"] = 29;
                values[valuesById[30] = "C_SHARP_SHARP"] = 30;
                values[valuesById[31] = "G_SHARP_SHARP"] = 31;
                values[valuesById[32] = "D_SHARP_SHARP"] = 32;
                values[valuesById[33] = "A_SHARP_SHARP"] = 33;
                values[valuesById[34] = "E_SHARP_SHARP"] = 34;
                values[valuesById[35] = "B_SHARP_SHARP"] = 35;
                return values;
            })();

            NoteSequence.TimeSignature = (function() {

                /**
                 * Properties of a TimeSignature.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @interface ITimeSignature
                 * @property {number|null} [time] TimeSignature time
                 * @property {number|null} [numerator] TimeSignature numerator
                 * @property {number|null} [denominator] TimeSignature denominator
                 */

                /**
                 * Constructs a new TimeSignature.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @classdesc Represents a TimeSignature.
                 * @implements ITimeSignature
                 * @constructor
                 * @param {tensorflow.magenta.NoteSequence.ITimeSignature=} [properties] Properties to set
                 */
                function TimeSignature(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimeSignature time.
                 * @member {number} time
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @instance
                 */
                TimeSignature.prototype.time = 0;

                /**
                 * TimeSignature numerator.
                 * @member {number} numerator
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @instance
                 */
                TimeSignature.prototype.numerator = 0;

                /**
                 * TimeSignature denominator.
                 * @member {number} denominator
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @instance
                 */
                TimeSignature.prototype.denominator = 0;

                /**
                 * Creates a new TimeSignature instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.ITimeSignature=} [properties] Properties to set
                 * @returns {tensorflow.magenta.NoteSequence.TimeSignature} TimeSignature instance
                 */
                TimeSignature.create = function create(properties) {
                    return new TimeSignature(properties);
                };

                /**
                 * Encodes the specified TimeSignature message. Does not implicitly {@link tensorflow.magenta.NoteSequence.TimeSignature.verify|verify} messages.
                 * @function encode
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.ITimeSignature} message TimeSignature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TimeSignature.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.time != null && message.hasOwnProperty("time"))
                        writer.uint32(/* id 1, wireType 1 =*/9).double(message.time);
                    if (message.numerator != null && message.hasOwnProperty("numerator"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.numerator);
                    if (message.denominator != null && message.hasOwnProperty("denominator"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.denominator);
                    return writer;
                };

                /**
                 * Encodes the specified TimeSignature message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.TimeSignature.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.ITimeSignature} message TimeSignature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TimeSignature.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TimeSignature message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.magenta.NoteSequence.TimeSignature} TimeSignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimeSignature.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.magenta.NoteSequence.TimeSignature();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.time = reader.double();
                            break;
                        case 2:
                            message.numerator = reader.int32();
                            break;
                        case 3:
                            message.denominator = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimeSignature message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tensorflow.magenta.NoteSequence.TimeSignature} TimeSignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimeSignature.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimeSignature message.
                 * @function verify
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimeSignature.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.time != null && message.hasOwnProperty("time"))
                        if (typeof message.time !== "number")
                            return "time: number expected";
                    if (message.numerator != null && message.hasOwnProperty("numerator"))
                        if (!$util.isInteger(message.numerator))
                            return "numerator: integer expected";
                    if (message.denominator != null && message.hasOwnProperty("denominator"))
                        if (!$util.isInteger(message.denominator))
                            return "denominator: integer expected";
                    return null;
                };

                /**
                 * Creates a TimeSignature message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.magenta.NoteSequence.TimeSignature} TimeSignature
                 */
                TimeSignature.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.magenta.NoteSequence.TimeSignature)
                        return object;
                    var message = new $root.tensorflow.magenta.NoteSequence.TimeSignature();
                    if (object.time != null)
                        message.time = Number(object.time);
                    if (object.numerator != null)
                        message.numerator = object.numerator | 0;
                    if (object.denominator != null)
                        message.denominator = object.denominator | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a TimeSignature message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.TimeSignature} message TimeSignature
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimeSignature.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.time = 0;
                        object.numerator = 0;
                        object.denominator = 0;
                    }
                    if (message.time != null && message.hasOwnProperty("time"))
                        object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
                    if (message.numerator != null && message.hasOwnProperty("numerator"))
                        object.numerator = message.numerator;
                    if (message.denominator != null && message.hasOwnProperty("denominator"))
                        object.denominator = message.denominator;
                    return object;
                };

                /**
                 * Converts this TimeSignature to JSON.
                 * @function toJSON
                 * @memberof tensorflow.magenta.NoteSequence.TimeSignature
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimeSignature.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TimeSignature;
            })();

            NoteSequence.KeySignature = (function() {

                /**
                 * Properties of a KeySignature.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @interface IKeySignature
                 * @property {number|null} [time] KeySignature time
                 * @property {tensorflow.magenta.NoteSequence.KeySignature.Key|null} [key] KeySignature key
                 * @property {tensorflow.magenta.NoteSequence.KeySignature.Mode|null} [mode] KeySignature mode
                 */

                /**
                 * Constructs a new KeySignature.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @classdesc Represents a KeySignature.
                 * @implements IKeySignature
                 * @constructor
                 * @param {tensorflow.magenta.NoteSequence.IKeySignature=} [properties] Properties to set
                 */
                function KeySignature(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * KeySignature time.
                 * @member {number} time
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @instance
                 */
                KeySignature.prototype.time = 0;

                /**
                 * KeySignature key.
                 * @member {tensorflow.magenta.NoteSequence.KeySignature.Key} key
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @instance
                 */
                KeySignature.prototype.key = 0;

                /**
                 * KeySignature mode.
                 * @member {tensorflow.magenta.NoteSequence.KeySignature.Mode} mode
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @instance
                 */
                KeySignature.prototype.mode = 0;

                /**
                 * Creates a new KeySignature instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.IKeySignature=} [properties] Properties to set
                 * @returns {tensorflow.magenta.NoteSequence.KeySignature} KeySignature instance
                 */
                KeySignature.create = function create(properties) {
                    return new KeySignature(properties);
                };

                /**
                 * Encodes the specified KeySignature message. Does not implicitly {@link tensorflow.magenta.NoteSequence.KeySignature.verify|verify} messages.
                 * @function encode
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.IKeySignature} message KeySignature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeySignature.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.time != null && message.hasOwnProperty("time"))
                        writer.uint32(/* id 1, wireType 1 =*/9).double(message.time);
                    if (message.key != null && message.hasOwnProperty("key"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.key);
                    if (message.mode != null && message.hasOwnProperty("mode"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mode);
                    return writer;
                };

                /**
                 * Encodes the specified KeySignature message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.KeySignature.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.IKeySignature} message KeySignature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeySignature.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a KeySignature message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.magenta.NoteSequence.KeySignature} KeySignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeySignature.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.magenta.NoteSequence.KeySignature();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.time = reader.double();
                            break;
                        case 2:
                            message.key = reader.int32();
                            break;
                        case 3:
                            message.mode = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a KeySignature message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tensorflow.magenta.NoteSequence.KeySignature} KeySignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeySignature.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a KeySignature message.
                 * @function verify
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                KeySignature.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.time != null && message.hasOwnProperty("time"))
                        if (typeof message.time !== "number")
                            return "time: number expected";
                    if (message.key != null && message.hasOwnProperty("key"))
                        switch (message.key) {
                        default:
                            return "key: enum value expected";
                        case 0:
                        case 1:
                        case 1:
                        case 2:
                        case 3:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 6:
                        case 7:
                        case 8:
                        case 8:
                        case 9:
                        case 10:
                        case 10:
                        case 11:
                            break;
                        }
                    if (message.mode != null && message.hasOwnProperty("mode"))
                        switch (message.mode) {
                        default:
                            return "mode: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a KeySignature message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.magenta.NoteSequence.KeySignature} KeySignature
                 */
                KeySignature.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.magenta.NoteSequence.KeySignature)
                        return object;
                    var message = new $root.tensorflow.magenta.NoteSequence.KeySignature();
                    if (object.time != null)
                        message.time = Number(object.time);
                    switch (object.key) {
                    case "C":
                    case 0:
                        message.key = 0;
                        break;
                    case "C_SHARP":
                    case 1:
                        message.key = 1;
                        break;
                    case "D_FLAT":
                    case 1:
                        message.key = 1;
                        break;
                    case "D":
                    case 2:
                        message.key = 2;
                        break;
                    case "D_SHARP":
                    case 3:
                        message.key = 3;
                        break;
                    case "E_FLAT":
                    case 3:
                        message.key = 3;
                        break;
                    case "E":
                    case 4:
                        message.key = 4;
                        break;
                    case "F":
                    case 5:
                        message.key = 5;
                        break;
                    case "F_SHARP":
                    case 6:
                        message.key = 6;
                        break;
                    case "G_FLAT":
                    case 6:
                        message.key = 6;
                        break;
                    case "G":
                    case 7:
                        message.key = 7;
                        break;
                    case "G_SHARP":
                    case 8:
                        message.key = 8;
                        break;
                    case "A_FLAT":
                    case 8:
                        message.key = 8;
                        break;
                    case "A":
                    case 9:
                        message.key = 9;
                        break;
                    case "A_SHARP":
                    case 10:
                        message.key = 10;
                        break;
                    case "B_FLAT":
                    case 10:
                        message.key = 10;
                        break;
                    case "B":
                    case 11:
                        message.key = 11;
                        break;
                    }
                    switch (object.mode) {
                    case "MAJOR":
                    case 0:
                        message.mode = 0;
                        break;
                    case "MINOR":
                    case 1:
                        message.mode = 1;
                        break;
                    case "NOT_SPECIFIED":
                    case 2:
                        message.mode = 2;
                        break;
                    case "MIXOLYDIAN":
                    case 3:
                        message.mode = 3;
                        break;
                    case "DORIAN":
                    case 4:
                        message.mode = 4;
                        break;
                    case "PHRYGIAN":
                    case 5:
                        message.mode = 5;
                        break;
                    case "LYDIAN":
                    case 6:
                        message.mode = 6;
                        break;
                    case "LOCRIAN":
                    case 7:
                        message.mode = 7;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a KeySignature message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.KeySignature} message KeySignature
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                KeySignature.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.time = 0;
                        object.key = options.enums === String ? "C" : 0;
                        object.mode = options.enums === String ? "MAJOR" : 0;
                    }
                    if (message.time != null && message.hasOwnProperty("time"))
                        object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
                    if (message.key != null && message.hasOwnProperty("key"))
                        object.key = options.enums === String ? $root.tensorflow.magenta.NoteSequence.KeySignature.Key[message.key] : message.key;
                    if (message.mode != null && message.hasOwnProperty("mode"))
                        object.mode = options.enums === String ? $root.tensorflow.magenta.NoteSequence.KeySignature.Mode[message.mode] : message.mode;
                    return object;
                };

                /**
                 * Converts this KeySignature to JSON.
                 * @function toJSON
                 * @memberof tensorflow.magenta.NoteSequence.KeySignature
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                KeySignature.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Key enum.
                 * @name tensorflow.magenta.NoteSequence.KeySignature.Key
                 * @enum {string}
                 * @property {number} C=0 C value
                 * @property {number} C_SHARP=1 C_SHARP value
                 * @property {number} D_FLAT=1 D_FLAT value
                 * @property {number} D=2 D value
                 * @property {number} D_SHARP=3 D_SHARP value
                 * @property {number} E_FLAT=3 E_FLAT value
                 * @property {number} E=4 E value
                 * @property {number} F=5 F value
                 * @property {number} F_SHARP=6 F_SHARP value
                 * @property {number} G_FLAT=6 G_FLAT value
                 * @property {number} G=7 G value
                 * @property {number} G_SHARP=8 G_SHARP value
                 * @property {number} A_FLAT=8 A_FLAT value
                 * @property {number} A=9 A value
                 * @property {number} A_SHARP=10 A_SHARP value
                 * @property {number} B_FLAT=10 B_FLAT value
                 * @property {number} B=11 B value
                 */
                KeySignature.Key = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "C"] = 0;
                    values[valuesById[1] = "C_SHARP"] = 1;
                    values["D_FLAT"] = 1;
                    values[valuesById[2] = "D"] = 2;
                    values[valuesById[3] = "D_SHARP"] = 3;
                    values["E_FLAT"] = 3;
                    values[valuesById[4] = "E"] = 4;
                    values[valuesById[5] = "F"] = 5;
                    values[valuesById[6] = "F_SHARP"] = 6;
                    values["G_FLAT"] = 6;
                    values[valuesById[7] = "G"] = 7;
                    values[valuesById[8] = "G_SHARP"] = 8;
                    values["A_FLAT"] = 8;
                    values[valuesById[9] = "A"] = 9;
                    values[valuesById[10] = "A_SHARP"] = 10;
                    values["B_FLAT"] = 10;
                    values[valuesById[11] = "B"] = 11;
                    return values;
                })();

                /**
                 * Mode enum.
                 * @name tensorflow.magenta.NoteSequence.KeySignature.Mode
                 * @enum {string}
                 * @property {number} MAJOR=0 MAJOR value
                 * @property {number} MINOR=1 MINOR value
                 * @property {number} NOT_SPECIFIED=2 NOT_SPECIFIED value
                 * @property {number} MIXOLYDIAN=3 MIXOLYDIAN value
                 * @property {number} DORIAN=4 DORIAN value
                 * @property {number} PHRYGIAN=5 PHRYGIAN value
                 * @property {number} LYDIAN=6 LYDIAN value
                 * @property {number} LOCRIAN=7 LOCRIAN value
                 */
                KeySignature.Mode = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "MAJOR"] = 0;
                    values[valuesById[1] = "MINOR"] = 1;
                    values[valuesById[2] = "NOT_SPECIFIED"] = 2;
                    values[valuesById[3] = "MIXOLYDIAN"] = 3;
                    values[valuesById[4] = "DORIAN"] = 4;
                    values[valuesById[5] = "PHRYGIAN"] = 5;
                    values[valuesById[6] = "LYDIAN"] = 6;
                    values[valuesById[7] = "LOCRIAN"] = 7;
                    return values;
                })();

                return KeySignature;
            })();

            NoteSequence.Tempo = (function() {

                /**
                 * Properties of a Tempo.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @interface ITempo
                 * @property {number|null} [time] Tempo time
                 * @property {number|null} [qpm] Tempo qpm
                 */

                /**
                 * Constructs a new Tempo.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @classdesc Represents a Tempo.
                 * @implements ITempo
                 * @constructor
                 * @param {tensorflow.magenta.NoteSequence.ITempo=} [properties] Properties to set
                 */
                function Tempo(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Tempo time.
                 * @member {number} time
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @instance
                 */
                Tempo.prototype.time = 0;

                /**
                 * Tempo qpm.
                 * @member {number} qpm
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @instance
                 */
                Tempo.prototype.qpm = 0;

                /**
                 * Creates a new Tempo instance using the specified properties.
                 * @function create
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.ITempo=} [properties] Properties to set
                 * @returns {tensorflow.magenta.NoteSequence.Tempo} Tempo instance
                 */
                Tempo.create = function create(properties) {
                    return new Tempo(properties);
                };

                /**
                 * Encodes the specified Tempo message. Does not implicitly {@link tensorflow.magenta.NoteSequence.Tempo.verify|verify} messages.
                 * @function encode
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.ITempo} message Tempo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tempo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.time != null && message.hasOwnProperty("time"))
                        writer.uint32(/* id 1, wireType 1 =*/9).double(message.time);
                    if (message.qpm != null && message.hasOwnProperty("qpm"))
                        writer.uint32(/* id 2, wireType 1 =*/17).double(message.qpm);
                    return writer;
                };

                /**
                 * Encodes the specified Tempo message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.Tempo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.ITempo} message Tempo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tempo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Tempo message from the specified reader or buffer.
                 * @function decode
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tensorflow.magenta.NoteSequence.Tempo} Tempo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tempo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tensorflow.magenta.NoteSequence.Tempo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.time = reader.double();
                            break;
                        case 2:
                            message.qpm = reader.double();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Tempo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tensorflow.magenta.NoteSequence.Tempo} Tempo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tempo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Tempo message.
                 * @function verify
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Tempo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.time != null && message.hasOwnProperty("time"))
                        if (typeof message.time !== "number")
                            return "time: number expected";
                    if (message.qpm != null && message.hasOwnProperty("qpm"))
                        if (typeof message.qpm !== "number")
                            return "qpm: number expected";
                    return null;
                };

                /**
                 * Creates a Tempo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tensorflow.magenta.NoteSequence.Tempo} Tempo
                 */
                Tempo.fromObject = function fromObject(object) {
                    if (object instanceof $root.tensorflow.magenta.NoteSequence.Tempo)
                        return object;
                    var message = new $root.tensorflow.magenta.NoteSequence.Tempo();
                    if (object.time != null)
                        message.time = Number(object.time);
                    if (object.qpm != null)
                        message.qpm = Number(object.qpm);
                    return message;
                };

                /**
                 * Creates a plain object from a Tempo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @static
                 * @param {tensorflow.magenta.NoteSequence.Tempo} message Tempo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Tempo.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.time = 0;
                        object.qpm = 0;
                    }
                    if (message.time != null && message.hasOwnProperty("time"))
                        object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
                    if (message.qpm != null && message.hasOwnProperty("qpm"))
                        object.qpm = options.json && !isFinite(message.qpm) ? String(message.qpm) : message.qpm;
                    return object;
                };

                /**
                 * Converts this Tempo to JSON.
                 * @function toJSON
                 * @memberof tensorflow.magenta.NoteSequence.Tempo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Tempo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Tempo;
            })();

            NoteSequence.PitchBend = (function() {

                /**
                 * Properties of a PitchBend.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @interface IPitchBend
                 * @property {number|null} [time] PitchBend time
                 * @property {number|null} [bend] PitchBend bend
                 * @property {number|null} [instrument] PitchBend instrument
                 * @property {number|null} [program] PitchBend program
                 * @property {boolean|null} [isDrum] PitchBend isDrum
                 */

                /**
                 * Constructs a new PitchBend.
                 * @memberof tensorflow.magenta.NoteSequence
                 * @classdesc Represents a PitchBend.
                 * @implements IPitchBend
                 * @constructor
                 * @param {tensorflow.magenta.NoteSequence.IPitchBend=} [properties] Properties to set
                 */
                function PitchBend(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PitchBend time.
                 * @member {number} time
                 * @memberof tensorflow.magenta.NoteSequence.PitchBend
                 * @instance
                 */
                PitchBend.prototype.time = 0;

                /**
                 * PitchBend bend.
                 * @member {number} bend
                 * @memberof tensorflow.magenta.NoteSequence.PitchBend
                 * @instance
                 */
                PitchBend.prototype.bend = 0;