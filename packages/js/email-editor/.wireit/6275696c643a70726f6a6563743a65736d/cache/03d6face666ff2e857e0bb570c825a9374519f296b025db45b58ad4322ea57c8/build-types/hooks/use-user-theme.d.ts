/**
 * Internal dependencies
 */
import { EmailTheme } from '../store';
export declare function useUserTheme(): {
    userTheme: {
        settings: {
            appearanceTools?: boolean;
            useRootPaddingAwareAlignments?: boolean;
            background?: {
                backgroundImage?: boolean;
                backgroundRepeat?: boolean;
                backgroundSize?: boolean;
                backgroundPosition?: boolean;
            };
            border?: {
                radius?: boolean;
                width?: boolean;
                style?: boolean;
                color?: boolean;
            };
            shadow?: {
                presets?: boolean;
                defaultPresets?: boolean;
            };
            color?: {
                background?: boolean;
                button?: boolean;
                caption?: boolean;
                custom?: boolean;
                customDuotone?: boolean;
                customGradient?: boolean;
                defaultDuotone?: boolean;
                defaultGradients?: boolean;
                defaultPalette?: boolean;
                duotone?: boolean;
                gradients?: {
                    default?: boolean;
                    theme?: boolean;
                    custom?: boolean;
                };
                heading?: boolean;
                link?: boolean;
                palette?: boolean;
                text?: boolean;
            };
            dimensions?: {
                aspectRatio?: boolean;
                minHeight?: boolean;
            };
            layout?: {
                contentSize?: string;
                wideSize?: string;
            };
            spacing?: {
                customSpacingSize?: number;
                blockGap?: number;
                margin?: boolean;
                padding?: boolean;
                spacingSizes?: number[];
                spacingScale?: number;
                units?: string[];
            };
            position?: {
                fixed?: boolean;
                sticky?: boolean;
            };
            typography?: {
                customFontSize?: boolean;
                defaultFontSizes?: boolean;
                dropCap?: boolean;
                fontFamilies?: boolean;
                fontSizes?: boolean;
                fontStyle?: boolean;
                fontWeight?: boolean;
                letterSpacing?: boolean;
                lineHeight?: boolean;
                textColumns?: boolean;
                textDecoration?: boolean;
                textTransform?: boolean;
                writingMode?: boolean;
            };
            lightbox?: {
                enabled?: boolean;
                allowEditing?: boolean;
            };
        };
        styles: import("../store").EmailStyles;
    };
    updateUserTheme: (newTheme: EmailTheme) => void;
};
