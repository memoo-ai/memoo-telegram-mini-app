import { useState, forwardRef, useImperativeHandle } from 'react';

interface IconProps {
  className?: string;
  hoverColor?: string;
  [key: string]: any;
  color?: string;
  iconColor?: string;
}

export const IconTwitter = forwardRef(
  ({ className, hoverColor = '#B53BFF', color = '#07E993', ...rest }: IconProps, ref) => {
    const [hovered, setHovered] = useState(false);
    useImperativeHandle(ref, () => ({
      setHovered,
    }));
    return (
      <svg
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36.05 33.76"
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={className}
        {...rest}
      >
        <g id="Design">
          <path
            style={{ fill: hovered ? hoverColor : color, strokeWidth: 0 }}
            d="M.08,0h.18C3.73,0,7.19,0,10.66,0c.11,0,.18.03.24.12,2.97,3.98,5.94,7.95,8.91,11.92.04.05.07.1.12.16.09-.1.18-.19.27-.28,2.01-2.17,4.01-4.34,6.02-6.51,1.64-1.77,3.28-3.54,4.92-5.31.06-.07.13-.1.22-.1.96,0,1.92,0,2.88,0h.16c-4.36,4.71-8.7,9.4-13.04,14.09,4.9,6.55,9.79,13.09,14.7,19.65-.06,0-.11.01-.15.01-3.49,0-6.98,0-10.47,0-.09,0-.14-.04-.2-.11-3.25-4.34-6.5-8.69-9.74-13.03-.02-.03-.05-.06-.08-.11-.1.1-.19.2-.27.29-2,2.16-4,4.32-6,6.48-1.97,2.13-3.94,4.25-5.91,6.38-.04.05-.12.09-.18.09-.98,0-1.96,0-2.94,0-.03,0-.06,0-.12,0,4.68-5.05,9.33-10.08,14-15.12C9.36,12.42,4.73,6.22.08,0ZM31.39,31.43c-.03-.05-.05-.08-.08-.11-.82-1.09-1.63-2.18-2.45-3.27-3.02-4.03-6.03-8.07-9.05-12.1-3.37-4.5-6.73-9-10.09-13.5-.05-.07-.1-.1-.2-.1-1.55,0-3.1,0-4.65,0-.04,0-.08,0-.14,0,.04.06.07.09.09.13.38.5.76,1.01,1.13,1.51,2.76,3.69,5.52,7.38,8.28,11.08,4.05,5.42,8.1,10.83,12.15,16.25.06.08.12.11.22.11,1.54,0,3.08,0,4.62,0h.15Z"
          />
        </g>
      </svg>
    );
  },
);
export const IconSuccess = forwardRef(({ className, iconColor, color = '#36D39D', ...rest }: IconProps, ref) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 9.99887C19.9932 15.4465 15.6471 20 10 20C4.36192 20.0022 0 15.4555 0 10.0011C0 4.55354 4.35291 0 9.99775 0C15.6493 0 19.991 4.55354 19.9977 9.99887H20ZM14.668 7.59824C14.659 6.97894 14.2516 6.58259 13.734 6.58034C13.4459 6.58034 13.2118 6.71771 13.016 6.91364C11.625 8.30762 10.2341 9.70161 8.84763 11.0978C8.77335 11.1722 8.73059 11.1767 8.65631 11.0978C8.12064 10.5529 7.58046 10.0124 7.04479 9.4674C6.92775 9.34805 6.79496 9.24896 6.64866 9.17239C6.26153 8.97196 5.84065 9.08231 5.58632 9.36831C5.2172 9.78043 5.25321 10.3051 5.64483 10.6992C6.44384 11.5032 7.2451 12.3049 8.05087 13.1066C8.47175 13.5255 9.03218 13.5278 9.45307 13.1066C11.0916 11.4717 12.7279 9.83673 14.3597 8.19728C14.5465 8.01036 14.6703 7.7784 14.6703 7.59824H14.668Z"
        fill={color}
      />
    </svg>
  );
});
export const IconError = forwardRef(({ className, iconColor, color = '#EF4D61', ...rest }: IconProps, ref) => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.0013716 9.74742C0.231449 4.02189 4.77139 -0.0805219 10.1122 0.00119949C16.0992 0.0942361 20.169 4.89568 20.0244 10.2126C19.8685 15.9432 15.3587 20.072 9.94498 19.999C3.83348 19.9161 -0.0841215 15.0153 0.0013716 9.74742ZM12.5047 13.4588C12.672 13.4588 12.8128 13.44 12.9473 13.367C13.552 13.0389 13.6438 12.2883 13.1208 11.749C12.6129 11.2234 12.0911 10.7105 11.5618 10.2063C11.3984 10.0504 11.4134 9.95361 11.5656 9.80776C12.0685 9.32121 12.5601 8.82208 13.0592 8.33049C13.2101 8.18088 13.332 8.01492 13.4074 7.81628C13.6162 7.25932 13.2842 6.69732 12.6971 6.598C12.3124 6.53262 11.9993 6.66841 11.734 6.93243C11.2387 7.42653 10.7396 7.91811 10.258 8.42604C10.0808 8.61212 9.97012 8.62595 9.78405 8.42856C9.29749 7.91057 8.79711 7.40641 8.28666 6.91357C7.66432 6.3126 6.78802 6.52759 6.59189 7.32343C6.49634 7.70941 6.68115 8.01744 6.93763 8.27894C7.4355 8.78562 7.9384 9.28852 8.4501 9.78136C8.61732 9.94229 8.65378 10.0441 8.46016 10.2252C7.95726 10.6954 7.47825 11.1933 6.98666 11.676C6.85842 11.8018 6.75156 11.9413 6.66984 12.101C6.47748 12.4719 6.61452 13.0376 6.95397 13.2803C7.37767 13.5833 7.85542 13.5267 8.28038 13.1055C8.79333 12.5989 9.30252 12.0884 9.80165 11.5679C9.96006 11.4032 10.0657 11.3894 10.2316 11.5629C10.7144 12.0696 11.211 12.5637 11.7064 13.0578C11.9314 13.2828 12.1741 13.4802 12.5035 13.4576L12.5047 13.4588Z"
        fill={color}
      />
    </svg>
  );
});
export const IconWarning = forwardRef(({ className, iconColor, color = '#FFC12E', ...rest }: IconProps, ref) => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.0012091 9.75414C0.233707 3.97813 4.82964 -0.0975081 10.1419 0.00177496C16.1605 0.114882 20.1758 4.94708 20.0338 10.2066C19.8792 15.9235 15.3863 20.0683 9.95591 19.9991C3.85943 19.9225 -0.0792228 15.04 0.0012091 9.75414ZM9.06362 8.11157C9.06362 8.79021 9.05733 9.47011 9.06613 10.1488C9.07367 10.7017 9.31874 11.0788 9.73095 11.2107C10.3644 11.413 10.955 10.9958 10.9739 10.2468C11.0091 8.83671 11.0078 7.42539 10.9751 6.01531C10.9575 5.24367 10.3204 4.81386 9.67566 5.06773C9.20438 5.25372 9.0787 5.6584 9.06739 6.10454C9.05105 6.77313 9.06362 7.44172 9.06362 8.11031V8.11157ZM11.283 13.7921C11.2742 13.0418 10.759 12.5215 10.025 12.5215C9.27978 12.5215 8.74692 13.0644 8.7708 13.8235C8.79467 14.5675 9.28983 15.03 10.025 15.0224C10.8055 15.0136 11.2554 14.5436 11.283 13.7933V13.7921Z"
        fill={color}
      />
    </svg>
  );
});
export const IconInfo = forwardRef(({ className, iconColor, color = '#04D0EA', ...rest }: IconProps, ref) => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.0012091 9.75414C0.233707 3.97813 4.82964 -0.0975081 10.1419 0.00177496C16.1605 0.114882 20.1758 4.94708 20.0338 10.2066C19.8792 15.9235 15.3863 20.0683 9.95591 19.9991C3.85943 19.9225 -0.0792228 15.04 0.0012091 9.75414ZM9.06362 8.11157C9.06362 8.79021 9.05733 9.47011 9.06613 10.1488C9.07367 10.7017 9.31874 11.0788 9.73095 11.2107C10.3644 11.413 10.955 10.9958 10.9739 10.2468C11.0091 8.83671 11.0078 7.42539 10.9751 6.01531C10.9575 5.24367 10.3204 4.81386 9.67566 5.06773C9.20438 5.25372 9.0787 5.6584 9.06739 6.10454C9.05105 6.77313 9.06362 7.44172 9.06362 8.11031V8.11157ZM11.283 13.7921C11.2742 13.0418 10.759 12.5215 10.025 12.5215C9.27978 12.5215 8.74692 13.0644 8.7708 13.8235C8.79467 14.5675 9.28983 15.03 10.025 15.0224C10.8055 15.0136 11.2554 14.5436 11.283 13.7933V13.7921Z"
        fill={color}
      />
    </svg>
  );
});
