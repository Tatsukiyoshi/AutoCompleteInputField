import { useState } from 'react';
import AutocompleteInput from './components/Auto-Complete-Input'; // コンポーネントのパスを調整してください
import './App.css'; // 必要であればApp全体のスタイル

function App() {
  const countries = [
    'Japan', 'United States', 'Canada', 'Mexico', 'Brazil',
    'United Kingdom', 'France', 'Germany', 'Italy', 'Spain',
    'China', 'India', 'Australia', 'New Zealand', 'South Africa',
    'Argentina', 'Egypt', 'Brazil', 'Russia', 'South Korea'
  ];

  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    console.log('選択された国:', country);
  };

  return (
    <div className="App">
      <h1>国名検索</h1>
      <p>入力すると候補が絞り込まれます。</p>
      <AutocompleteInput
        options={countries}
        placeholder="国名を入力または選択"
        onSelect={handleCountrySelect}
      />
      {selectedCountry && (
        <p>現在選択されている国: <strong>{selectedCountry}</strong></p>
      )}
    </div>
  );
}

export default App;