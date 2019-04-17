import React from 'react'

export const Icon = ({ dark, ...props }) => !dark
  ? <DarkOnWhite {...props} />
  : <WhiteOnDark {...props} />

const DarkOnWhite = props => (
  <SVG {...props} viewBox='0 0 599 599' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <mask id='mask0' maskUnits='userSpaceOnUse' x='49' y='16' width='501' height='567'>
      <path d='M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z' fill='white' />
    </mask>
    <defs>
      <linearGradient id='paint0_linear' x1='565.354' y1='143.699' x2='299.341' y2='599.111' gradientUnits='userSpaceOnUse'>
        <stop offset='0.364583' stopColor='#5C5C5C' />
        <stop offset='1' stopColor='#333333' />
      </linearGradient>
      <linearGradient id='paint1_linear' x1='338' y1='582' x2='338' y2='16.0008' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#999999' />
        <stop offset='1' stopColor='#CCCCCC' />
      </linearGradient>
    </defs>
    <g mask='url(#mask0)'>
      <path d='M564.996 399.804L564.962 198.198L564.958 169.632C564.954 154.858 557.068 141.208 544.265 133.823L320.138 4.53712C307.337 -2.84805 291.565 -2.84571 278.766 4.54415L54.6809 133.904C41.8812 141.293 33.9988 154.945 34 169.719L34.0047 198.197L34.0387 399.803L34.0434 428.369C34.0457 443.141 41.9328 456.791 54.7348 464.176L278.862 593.464C291.665 600.849 307.435 600.844 320.234 593.457L544.319 464.094C557.119 456.706 565.001 443.053 565 428.278L564.996 399.804Z' fill='url(#paint0_linear)' />
      <rect x='33' width='533' height='599' fill='currentcolor' />
      <path d='M478 16L368.69 16L198 299.574L369.034 582L477.31 582L307.31 299.574L478 16Z' fill='#E6E6E6' />
      <mask id='mask1' maskUnits='userSpaceOnUse' x='198' y='16' width='281' height='375'>
        <path d='M478 16L368.69 16L198 299.575L252 391L307.31 299.575L478 16Z' fill='url(#paint1_linear)' />
      </mask>
      <g mask='url(#mask1)'>
        <path d='M478 16L368.69 16L198 299.574L369.034 582L477.31 582L307.31 299.574L478 16Z' fill='white' />
      </g>
    </g>
  </SVG>

)

const WhiteOnDark = props => (
  <SVG {...props} viewBox='0 0 599 599' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <mask id='mask0' maskUnits='userSpaceOnUse' x='49' y='16' width='501' height='567'>
      <path d='M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z' fill='white' />
    </mask>
    <defs>
      <linearGradient id='paint03_linear' x1='565.354' y1='143.699' x2='299.341' y2='599.111' gradientUnits='userSpaceOnUse'>
        <stop offset='0.364583' stopColor='#F5F5F5' />
        <stop offset='1' stopColor='#EBEBEB' />
      </linearGradient>
      <linearGradient id='paint01_linear' x1='338' y1='582' x2='338' y2='16.0008' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#999999' />
        <stop offset='1' stopColor='#CCCCCC' />
      </linearGradient>
    </defs>
    <g mask='url(#mask0)'>
      <path d='M564.996 399.804L564.962 198.198L564.958 169.632C564.954 154.858 557.068 141.208 544.265 133.823L320.138 4.53712C307.337 -2.84805 291.565 -2.84571 278.766 4.54415L54.6809 133.904C41.8812 141.293 33.9988 154.945 34 169.719L34.0047 198.197L34.0387 399.803L34.0434 428.369C34.0457 443.141 41.9328 456.791 54.7348 464.176L278.862 593.464C291.665 600.849 307.435 600.844 320.234 593.457L544.319 464.094C557.119 456.706 565.001 443.053 565 428.278L564.996 399.804Z' fill='url(#paint03_linear)' />
      <path d='M478 16L368.69 16L198 299.574L369.034 582L477.31 582L307.31 299.574L478 16Z' fill='currentcolor' />
      <path d='M478 16L368.69 16L198 299.574L369.034 582L477.31 582L307.31 299.574L478 16Z' fill='black' fillOpacity='0.05' />
      <mask id='mask1' maskUnits='userSpaceOnUse' x='198' y='16' width='281' height='375'>
        <path d='M478 16L368.69 16L198 299.575L252 391L307.31 299.575L478 16Z' fill='url(#paint01_linear)' />
      </mask>
      <g mask='url(#mask1)'>
        <path d='M478 16L368.69 16L198 299.574L369.034 582L477.31 582L307.31 299.574L478 16Z' fill='currentcolor' />
      </g>
    </g>
  </SVG>

)

const SVG = props => <svg {...props} />