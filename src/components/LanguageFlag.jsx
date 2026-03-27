export default function LanguageFlag({ flagCode }) {

    const url = `https://flagcdn.com/16x12/${flagCode}.png`

    return (
        <img src={url} alt={flagCode} id="flag" />
    )
}