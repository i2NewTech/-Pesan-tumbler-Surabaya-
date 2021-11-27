
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