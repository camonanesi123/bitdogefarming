import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd, usePrice3CakeBusd, useProfile } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const cakePrice2Usd = usePrice3CakeBusd()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      cakePrice2Usd={cakePrice2Usd.toNumber()}
      links={config}
      priceLink="https://bscscan.com/token/0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9"
      priceLink2="https://bscscan.com/token/0xcBA1813Ede683333020cedea7C3b63FbaC28e78e"
      {...props}
    />
  )
}

export default Menu
