import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currencyRates } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { Coffee, Utensils, Car, Hotel } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Handle conversion
  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) return;
    
    const fromRate = currencyRates.find(rate => rate.code === fromCurrency)?.rate || 1;
    const toRate = currencyRates.find(rate => rate.code === toCurrency)?.rate || 1;
    
    const amountInUSD = Number(amount) / fromRate;
    const convertedValue = amountInUSD * toRate;
    
    setConvertedAmount(convertedValue);
    setShowResult(true);
  };
  
  // Format currency code and name for display
  const formatCurrencyOption = (code: string) => {
    const currency = currencyRates.find(c => c.code === code);
    return `${code} - ${currency?.name}`;
  };
  
  // Get currency symbol
  const getCurrencySymbol = (code: string) => {
    return currencyRates.find(c => c.code === code)?.symbol || '';
  };
  
  // Quick conversion examples
  const quickEstimates = [
    { id: 'coffee', name: 'Coffee', icon: <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400" />, amount: 3.5 },
    { id: 'meal', name: 'Local Meal', icon: <Utensils className="w-5 h-5 text-green-600 dark:text-green-400" />, amount: 8 },
    { id: 'transport', name: 'Local Transportation', icon: <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />, amount: 2.5 },
    { id: 'hotel', name: 'Hotel Room', icon: <Hotel className="w-5 h-5 text-purple-600 dark:text-purple-400" />, amount: 50 }
  ];

  return (
    <section id="currency" className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Currency Converter</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-4">Convert Currency</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-dark-card dark:text-white" 
                  placeholder="Enter amount" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</Label>
                  <Select
                    value={fromCurrency}
                    onValueChange={(value) => setFromCurrency(value)}
                  >
                    <SelectTrigger id="from-currency" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-dark-card dark:text-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyRates.map(currency => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {formatCurrencyOption(currency.code)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="to-currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</Label>
                  <Select
                    value={toCurrency}
                    onValueChange={(value) => setToCurrency(value)}
                  >
                    <SelectTrigger id="to-currency" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-dark-card dark:text-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyRates.map(currency => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {formatCurrencyOption(currency.code)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleConvert}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Convert
              </Button>
              
              {showResult && convertedAmount !== null && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                  <p className="text-lg font-medium text-center" id="conversion-result">
                    {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-4">Quick Estimates</h3>
            
            <div className="space-y-4">
              {quickEstimates.map(item => {
                // Calculate converted amount
                const fromRate = currencyRates.find(rate => rate.code === 'USD')?.rate || 1;
                const toRate = currencyRates.find(rate => rate.code === 'IDR')?.rate || 1;
                const convertedValue = (item.amount / fromRate) * toRate;
                
                return (
                  <div key={item.id} className="p-3 bg-gray-50 dark:bg-dark-card rounded-lg flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg mr-3">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Per unit</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">≈ {formatCurrency(convertedValue, 'IDR', 'id-ID')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {toCurrency !== 'USD' && (
              <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                Exchange rate: 1 USD = {currencyRates.find(c => c.code === toCurrency)?.rate.toFixed(2)} {toCurrency}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
