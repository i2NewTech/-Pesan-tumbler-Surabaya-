
import * as $protobuf from "protobufjs";

/** Namespace tensorflow. */
export namespace tensorflow {

    /** Namespace magenta. */
    namespace magenta {

        /** Properties of a NoteSequence. */
        interface INoteSequence {

            /** NoteSequence id */
            id?: (string|null);

            /** NoteSequence filename */
            filename?: (string|null);

            /** NoteSequence referenceNumber */
            referenceNumber?: (number|null);

            /** NoteSequence collectionName */
            collectionName?: (string|null);

            /** NoteSequence ticksPerQuarter */
            ticksPerQuarter?: (number|null);

            /** NoteSequence timeSignatures */
            timeSignatures?: (tensorflow.magenta.NoteSequence.ITimeSignature[]|null);

            /** NoteSequence keySignatures */
            keySignatures?: (tensorflow.magenta.NoteSequence.IKeySignature[]|null);

            /** NoteSequence tempos */
            tempos?: (tensorflow.magenta.NoteSequence.ITempo[]|null);

            /** NoteSequence notes */
            notes?: (tensorflow.magenta.NoteSequence.INote[]|null);

            /** NoteSequence totalTime */
            totalTime?: (number|null);

            /** NoteSequence totalQuantizedSteps */
            totalQuantizedSteps?: (number|null);

            /** NoteSequence pitchBends */
            pitchBends?: (tensorflow.magenta.NoteSequence.IPitchBend[]|null);

            /** NoteSequence controlChanges */
            controlChanges?: (tensorflow.magenta.NoteSequence.IControlChange[]|null);

            /** NoteSequence partInfos */
            partInfos?: (tensorflow.magenta.NoteSequence.IPartInfo[]|null);

            /** NoteSequence sourceInfo */
            sourceInfo?: (tensorflow.magenta.NoteSequence.ISourceInfo|null);

            /** NoteSequence textAnnotations */
            textAnnotations?: (tensorflow.magenta.NoteSequence.ITextAnnotation[]|null);

            /** NoteSequence sectionAnnotations */
            sectionAnnotations?: (tensorflow.magenta.NoteSequence.ISectionAnnotation[]|null);

            /** NoteSequence sectionGroups */
            sectionGroups?: (tensorflow.magenta.NoteSequence.ISectionGroup[]|null);

            /** NoteSequence quantizationInfo */
            quantizationInfo?: (tensorflow.magenta.NoteSequence.IQuantizationInfo|null);

            /** NoteSequence subsequenceInfo */
            subsequenceInfo?: (tensorflow.magenta.NoteSequence.ISubsequenceInfo|null);

            /** NoteSequence sequenceMetadata */
            sequenceMetadata?: (tensorflow.magenta.ISequenceMetadata|null);
        }

        /** Represents a NoteSequence. */
        class NoteSequence implements INoteSequence {

            /**
             * Constructs a new NoteSequence.
             * @param [properties] Properties to set
             */
            constructor(properties?: tensorflow.magenta.INoteSequence);

            /** NoteSequence id. */
            public id: string;

            /** NoteSequence filename. */
            public filename: string;

            /** NoteSequence referenceNumber. */
            public referenceNumber: number;

            /** NoteSequence collectionName. */
            public collectionName: string;

            /** NoteSequence ticksPerQuarter. */
            public ticksPerQuarter: number;

            /** NoteSequence timeSignatures. */
            public timeSignatures: tensorflow.magenta.NoteSequence.ITimeSignature[];

            /** NoteSequence keySignatures. */
            public keySignatures: tensorflow.magenta.NoteSequence.IKeySignature[];

            /** NoteSequence tempos. */
            public tempos: tensorflow.magenta.NoteSequence.ITempo[];

            /** NoteSequence notes. */
            public notes: tensorflow.magenta.NoteSequence.INote[];

            /** NoteSequence totalTime. */
            public totalTime: number;

            /** NoteSequence totalQuantizedSteps. */
            public totalQuantizedSteps: number;

            /** NoteSequence pitchBends. */
            public pitchBends: tensorflow.magenta.NoteSequence.IPitchBend[];

            /** NoteSequence controlChanges. */
            public controlChanges: tensorflow.magenta.NoteSequence.IControlChange[];

            /** NoteSequence partInfos. */
            public partInfos: tensorflow.magenta.NoteSequence.IPartInfo[];

            /** NoteSequence sourceInfo. */
            public sourceInfo?: (tensorflow.magenta.NoteSequence.ISourceInfo|null);

            /** NoteSequence textAnnotations. */
            public textAnnotations: tensorflow.magenta.NoteSequence.ITextAnnotation[];

            /** NoteSequence sectionAnnotations. */
            public sectionAnnotations: tensorflow.magenta.NoteSequence.ISectionAnnotation[];

            /** NoteSequence sectionGroups. */
            public sectionGroups: tensorflow.magenta.NoteSequence.ISectionGroup[];

            /** NoteSequence quantizationInfo. */
            public quantizationInfo?: (tensorflow.magenta.NoteSequence.IQuantizationInfo|null);

            /** NoteSequence subsequenceInfo. */
            public subsequenceInfo?: (tensorflow.magenta.NoteSequence.ISubsequenceInfo|null);

            /** NoteSequence sequenceMetadata. */
            public sequenceMetadata?: (tensorflow.magenta.ISequenceMetadata|null);

            /**
             * Creates a new NoteSequence instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NoteSequence instance
             */
            public static create(properties?: tensorflow.magenta.INoteSequence): tensorflow.magenta.NoteSequence;

            /**
             * Encodes the specified NoteSequence message. Does not implicitly {@link tensorflow.magenta.NoteSequence.verify|verify} messages.
             * @param message NoteSequence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tensorflow.magenta.INoteSequence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NoteSequence message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.verify|verify} messages.
             * @param message NoteSequence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tensorflow.magenta.INoteSequence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NoteSequence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NoteSequence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence;

            /**
             * Decodes a NoteSequence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NoteSequence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence;

            /**
             * Verifies a NoteSequence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not