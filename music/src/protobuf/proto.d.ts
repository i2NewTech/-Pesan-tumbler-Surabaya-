
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
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NoteSequence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NoteSequence
             */
            public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence;

            /**
             * Creates a plain object from a NoteSequence message. Also converts values to other types if specified.
             * @param message NoteSequence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tensorflow.magenta.NoteSequence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NoteSequence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace NoteSequence {

            /** Properties of a Note. */
            interface INote {

                /** Note pitch */
                pitch?: (number|null);

                /** Note pitchName */
                pitchName?: (tensorflow.magenta.NoteSequence.PitchName|null);

                /** Note velocity */
                velocity?: (number|null);

                /** Note startTime */
                startTime?: (number|null);

                /** Note quantizedStartStep */
                quantizedStartStep?: (number|null);

                /** Note endTime */
                endTime?: (number|null);

                /** Note quantizedEndStep */
                quantizedEndStep?: (number|null);

                /** Note numerator */
                numerator?: (number|null);

                /** Note denominator */
                denominator?: (number|null);

                /** Note instrument */
                instrument?: (number|null);

                /** Note program */
                program?: (number|null);

                /** Note isDrum */
                isDrum?: (boolean|null);

                /** Note part */
                part?: (number|null);

                /** Note voice */
                voice?: (number|null);
            }

            /** Represents a Note. */
            class Note implements INote {

                /**
                 * Constructs a new Note.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.INote);

                /** Note pitch. */
                public pitch: number;

                /** Note pitchName. */
                public pitchName: tensorflow.magenta.NoteSequence.PitchName;

                /** Note velocity. */
                public velocity: number;

                /** Note startTime. */
                public startTime: number;

                /** Note quantizedStartStep. */
                public quantizedStartStep: number;

                /** Note endTime. */
                public endTime: number;

                /** Note quantizedEndStep. */
                public quantizedEndStep: number;

                /** Note numerator. */
                public numerator: number;

                /** Note denominator. */
                public denominator: number;

                /** Note instrument. */
                public instrument: number;

                /** Note program. */
                public program: number;

                /** Note isDrum. */
                public isDrum: boolean;

                /** Note part. */
                public part: number;

                /** Note voice. */
                public voice: number;

                /**
                 * Creates a new Note instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Note instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.INote): tensorflow.magenta.NoteSequence.Note;

                /**
                 * Encodes the specified Note message. Does not implicitly {@link tensorflow.magenta.NoteSequence.Note.verify|verify} messages.
                 * @param message Note message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.INote, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Note message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.Note.verify|verify} messages.
                 * @param message Note message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.INote, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Note message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Note
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.Note;

                /**
                 * Decodes a Note message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Note
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence.Note;

                /**
                 * Verifies a Note message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Note message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Note
                 */
                public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence.Note;

                /**
                 * Creates a plain object from a Note message. Also converts values to other types if specified.
                 * @param message Note
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tensorflow.magenta.NoteSequence.Note, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Note to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** PitchName enum. */
            enum PitchName {
                UNKNOWN_PITCH_NAME = 0,
                F_FLAT_FLAT = 1,
                C_FLAT_FLAT = 2,
                G_FLAT_FLAT = 3,
                D_FLAT_FLAT = 4,
                A_FLAT_FLAT = 5,
                E_FLAT_FLAT = 6,
                B_FLAT_FLAT = 7,
                F_FLAT = 8,
                C_FLAT = 9,
                G_FLAT = 10,
                D_FLAT = 11,
                A_FLAT = 12,
                E_FLAT = 13,
                B_FLAT = 14,
                F = 15,
                C = 16,
                G = 17,
                D = 18,
                A = 19,
                E = 20,
                B = 21,
                F_SHARP = 22,
                C_SHARP = 23,
                G_SHARP = 24,
                D_SHARP = 25,
                A_SHARP = 26,
                E_SHARP = 27,
                B_SHARP = 28,
                F_SHARP_SHARP = 29,
                C_SHARP_SHARP = 30,
                G_SHARP_SHARP = 31,
                D_SHARP_SHARP = 32,
                A_SHARP_SHARP = 33,
                E_SHARP_SHARP = 34,
                B_SHARP_SHARP = 35
            }

            /** Properties of a TimeSignature. */
            interface ITimeSignature {

                /** TimeSignature time */
                time?: (number|null);

                /** TimeSignature numerator */
                numerator?: (number|null);

                /** TimeSignature denominator */
                denominator?: (number|null);
            }

            /** Represents a TimeSignature. */
            class TimeSignature implements ITimeSignature {

                /**
                 * Constructs a new TimeSignature.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.ITimeSignature);

                /** TimeSignature time. */
                public time: number;

                /** TimeSignature numerator. */
                public numerator: number;

                /** TimeSignature denominator. */
                public denominator: number;

                /**
                 * Creates a new TimeSignature instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TimeSignature instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.ITimeSignature): tensorflow.magenta.NoteSequence.TimeSignature;

                /**
                 * Encodes the specified TimeSignature message. Does not implicitly {@link tensorflow.magenta.NoteSequence.TimeSignature.verify|verify} messages.
                 * @param message TimeSignature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.ITimeSignature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TimeSignature message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.TimeSignature.verify|verify} messages.
                 * @param message TimeSignature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.ITimeSignature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TimeSignature message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimeSignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.TimeSignature;

                /**
                 * Decodes a TimeSignature message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimeSignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence.TimeSignature;

                /**
                 * Verifies a TimeSignature message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimeSignature message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimeSignature
                 */
                public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence.TimeSignature;

                /**
                 * Creates a plain object from a TimeSignature message. Also converts values to other types if specified.
                 * @param message TimeSignature
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tensorflow.magenta.NoteSequence.TimeSignature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimeSignature to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a KeySignature. */
            interface IKeySignature {

                /** KeySignature time */
                time?: (number|null);

                /** KeySignature key */
                key?: (tensorflow.magenta.NoteSequence.KeySignature.Key|null);

                /** KeySignature mode */
                mode?: (tensorflow.magenta.NoteSequence.KeySignature.Mode|null);
            }

            /** Represents a KeySignature. */
            class KeySignature implements IKeySignature {

                /**
                 * Constructs a new KeySignature.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.IKeySignature);

                /** KeySignature time. */
                public time: number;

                /** KeySignature key. */
                public key: tensorflow.magenta.NoteSequence.KeySignature.Key;

                /** KeySignature mode. */
                public mode: tensorflow.magenta.NoteSequence.KeySignature.Mode;

                /**
                 * Creates a new KeySignature instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns KeySignature instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.IKeySignature): tensorflow.magenta.NoteSequence.KeySignature;

                /**
                 * Encodes the specified KeySignature message. Does not implicitly {@link tensorflow.magenta.NoteSequence.KeySignature.verify|verify} messages.
                 * @param message KeySignature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.IKeySignature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified KeySignature message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.KeySignature.verify|verify} messages.
                 * @param message KeySignature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.IKeySignature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a KeySignature message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns KeySignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.KeySignature;

                /**
                 * Decodes a KeySignature message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns KeySignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence.KeySignature;

                /**
                 * Verifies a KeySignature message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a KeySignature message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns KeySignature
                 */
                public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence.KeySignature;

                /**
                 * Creates a plain object from a KeySignature message. Also converts values to other types if specified.
                 * @param message KeySignature
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tensorflow.magenta.NoteSequence.KeySignature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this KeySignature to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace KeySignature {

                /** Key enum. */
                enum Key {
                    C = 0,
                    C_SHARP = 1,
                    D_FLAT = 1,
                    D = 2,
                    D_SHARP = 3,
                    E_FLAT = 3,
                    E = 4,
                    F = 5,
                    F_SHARP = 6,
                    G_FLAT = 6,
                    G = 7,
                    G_SHARP = 8,
                    A_FLAT = 8,
                    A = 9,
                    A_SHARP = 10,
                    B_FLAT = 10,
                    B = 11
                }

                /** Mode enum. */
                enum Mode {
                    MAJOR = 0,
                    MINOR = 1,
                    NOT_SPECIFIED = 2,
                    MIXOLYDIAN = 3,
                    DORIAN = 4,
                    PHRYGIAN = 5,
                    LYDIAN = 6,
                    LOCRIAN = 7
                }
            }

            /** Properties of a Tempo. */
            interface ITempo {

                /** Tempo time */
                time?: (number|null);

                /** Tempo qpm */
                qpm?: (number|null);
            }

            /** Represents a Tempo. */
            class Tempo implements ITempo {

                /**
                 * Constructs a new Tempo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.ITempo);

                /** Tempo time. */
                public time: number;

                /** Tempo qpm. */
                public qpm: number;

                /**
                 * Creates a new Tempo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Tempo instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.ITempo): tensorflow.magenta.NoteSequence.Tempo;

                /**
                 * Encodes the specified Tempo message. Does not implicitly {@link tensorflow.magenta.NoteSequence.Tempo.verify|verify} messages.
                 * @param message Tempo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.ITempo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Tempo message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.Tempo.verify|verify} messages.
                 * @param message Tempo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.ITempo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Tempo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Tempo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.Tempo;

                /**
                 * Decodes a Tempo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Tempo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence.Tempo;

                /**
                 * Verifies a Tempo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Tempo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Tempo
                 */
                public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence.Tempo;

                /**
                 * Creates a plain object from a Tempo message. Also converts values to other types if specified.
                 * @param message Tempo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tensorflow.magenta.NoteSequence.Tempo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Tempo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PitchBend. */
            interface IPitchBend {

                /** PitchBend time */
                time?: (number|null);

                /** PitchBend bend */
                bend?: (number|null);

                /** PitchBend instrument */
                instrument?: (number|null);

                /** PitchBend program */
                program?: (number|null);

                /** PitchBend isDrum */
                isDrum?: (boolean|null);
            }

            /** Represents a PitchBend. */
            class PitchBend implements IPitchBend {

                /**
                 * Constructs a new PitchBend.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.IPitchBend);

                /** PitchBend time. */
                public time: number;

                /** PitchBend bend. */
                public bend: number;

                /** PitchBend instrument. */
                public instrument: number;

                /** PitchBend program. */
                public program: number;

                /** PitchBend isDrum. */
                public isDrum: boolean;

                /**
                 * Creates a new PitchBend instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PitchBend instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.IPitchBend): tensorflow.magenta.NoteSequence.PitchBend;

                /**
                 * Encodes the specified PitchBend message. Does not implicitly {@link tensorflow.magenta.NoteSequence.PitchBend.verify|verify} messages.
                 * @param message PitchBend message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.IPitchBend, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PitchBend message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.PitchBend.verify|verify} messages.
                 * @param message PitchBend message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.IPitchBend, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PitchBend message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PitchBend
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.PitchBend;

                /**
                 * Decodes a PitchBend message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PitchBend
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence.PitchBend;

                /**
                 * Verifies a PitchBend message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PitchBend message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PitchBend
                 */
                public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence.PitchBend;

                /**
                 * Creates a plain object from a PitchBend message. Also converts values to other types if specified.
                 * @param message PitchBend
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tensorflow.magenta.NoteSequence.PitchBend, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PitchBend to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ControlChange. */
            interface IControlChange {

                /** ControlChange time */
                time?: (number|null);

                /** ControlChange quantizedStep */
                quantizedStep?: (number|null);

                /** ControlChange controlNumber */
                controlNumber?: (number|null);

                /** ControlChange controlValue */
                controlValue?: (number|null);

                /** ControlChange instrument */
                instrument?: (number|null);

                /** ControlChange program */
                program?: (number|null);

                /** ControlChange isDrum */
                isDrum?: (boolean|null);
            }

            /** Represents a ControlChange. */
            class ControlChange implements IControlChange {

                /**
                 * Constructs a new ControlChange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.IControlChange);

                /** ControlChange time. */
                public time: number;

                /** ControlChange quantizedStep. */
                public quantizedStep: number;

                /** ControlChange controlNumber. */
                public controlNumber: number;

                /** ControlChange controlValue. */
                public controlValue: number;

                /** ControlChange instrument. */
                public instrument: number;

                /** ControlChange program. */
                public program: number;

                /** ControlChange isDrum. */
                public isDrum: boolean;

                /**
                 * Creates a new ControlChange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ControlChange instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.IControlChange): tensorflow.magenta.NoteSequence.ControlChange;

                /**
                 * Encodes the specified ControlChange message. Does not implicitly {@link tensorflow.magenta.NoteSequence.ControlChange.verify|verify} messages.
                 * @param message ControlChange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.IControlChange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ControlChange message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.ControlChange.verify|verify} messages.
                 * @param message ControlChange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.IControlChange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ControlChange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ControlChange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.ControlChange;

                /**
                 * Decodes a ControlChange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ControlChange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence.ControlChange;

                /**
                 * Verifies a ControlChange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ControlChange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ControlChange
                 */
                public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence.ControlChange;

                /**
                 * Creates a plain object from a ControlChange message. Also converts values to other types if specified.
                 * @param message ControlChange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tensorflow.magenta.NoteSequence.ControlChange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ControlChange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PartInfo. */
            interface IPartInfo {

                /** PartInfo part */
                part?: (number|null);

                /** PartInfo name */
                name?: (string|null);
            }

            /** Represents a PartInfo. */
            class PartInfo implements IPartInfo {

                /**
                 * Constructs a new PartInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.IPartInfo);

                /** PartInfo part. */
                public part: number;

                /** PartInfo name. */
                public name: string;

                /**
                 * Creates a new PartInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PartInfo instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.IPartInfo): tensorflow.magenta.NoteSequence.PartInfo;

                /**
                 * Encodes the specified PartInfo message. Does not implicitly {@link tensorflow.magenta.NoteSequence.PartInfo.verify|verify} messages.
                 * @param message PartInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.IPartInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PartInfo message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.PartInfo.verify|verify} messages.
                 * @param message PartInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.IPartInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PartInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PartInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.PartInfo;

                /**
                 * Decodes a PartInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PartInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tensorflow.magenta.NoteSequence.PartInfo;

                /**
                 * Verifies a PartInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PartInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PartInfo
                 */
                public static fromObject(object: { [k: string]: any }): tensorflow.magenta.NoteSequence.PartInfo;

                /**
                 * Creates a plain object from a PartInfo message. Also converts values to other types if specified.
                 * @param message PartInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tensorflow.magenta.NoteSequence.PartInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PartInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SourceInfo. */
            interface ISourceInfo {

                /** SourceInfo sourceType */
                sourceType?: (tensorflow.magenta.NoteSequence.SourceInfo.SourceType|null);

                /** SourceInfo encodingType */
                encodingType?: (tensorflow.magenta.NoteSequence.SourceInfo.EncodingType|null);

                /** SourceInfo parser */
                parser?: (tensorflow.magenta.NoteSequence.SourceInfo.Parser|null);
            }

            /** Represents a SourceInfo. */
            class SourceInfo implements ISourceInfo {

                /**
                 * Constructs a new SourceInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tensorflow.magenta.NoteSequence.ISourceInfo);

                /** SourceInfo sourceType. */
                public sourceType: tensorflow.magenta.NoteSequence.SourceInfo.SourceType;

                /** SourceInfo encodingType. */
                public encodingType: tensorflow.magenta.NoteSequence.SourceInfo.EncodingType;

                /** SourceInfo parser. */
                public parser: tensorflow.magenta.NoteSequence.SourceInfo.Parser;

                /**
                 * Creates a new SourceInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SourceInfo instance
                 */
                public static create(properties?: tensorflow.magenta.NoteSequence.ISourceInfo): tensorflow.magenta.NoteSequence.SourceInfo;

                /**
                 * Encodes the specified SourceInfo message. Does not implicitly {@link tensorflow.magenta.NoteSequence.SourceInfo.verify|verify} messages.
                 * @param message SourceInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tensorflow.magenta.NoteSequence.ISourceInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SourceInfo message, length delimited. Does not implicitly {@link tensorflow.magenta.NoteSequence.SourceInfo.verify|verify} messages.
                 * @param message SourceInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tensorflow.magenta.NoteSequence.ISourceInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SourceInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SourceInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tensorflow.magenta.NoteSequence.SourceInfo;

                /**
                 * Decodes a SourceInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SourceInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */