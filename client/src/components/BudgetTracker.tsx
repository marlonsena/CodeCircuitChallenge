import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { expenses as initialExpenses, expenseCategories, currentTrip, getBudgetStats } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  location?: string;
}

export default function BudgetTracker() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("budget-expenses", initialExpenses);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'accommodation',
    description: ''
  });
  
  const stats = getBudgetStats();
  
  // Add new expense
  const handleAddExpense = () => {
    if (!newExpense.amount || isNaN(Number(newExpense.amount))) return;
    
    const expense: Expense = {
      id: `e${expenses.length + 1}`,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description || newExpense.category,
      date: new Date().toISOString().split('T')[0]
    };
    
    setExpenses([...expenses, expense]);
    
    // Clear form
    setNewExpense({
      amount: '',
      category: 'accommodation',
      description: ''
    });
  };
  
  // Get icon and color for category
  const getCategoryDetails = (categoryId: string) => {
    const category = expenseCategories.find(c => c.id === categoryId);
    return {
      icon: category?.icon || 'question-mark',
      color: category?.color || 'bg-gray-500'
    };
  };

  return (
    <section id="budget" className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Budget Tracker</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{formatCurrency(stats.totalBudget)}</div>
            <div className="flex items-center text-sm text-gray-500">
              <span>{formatCurrency(stats.spent)} spent</span>
              <span className="mx-1">•</span>
              <span className="text-green-600">{formatCurrency(stats.remaining)} remaining</span>
            </div>
            <Progress 
              value={stats.progress} 
              className="w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full mt-3"
            />
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium mb-2">Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label htmlFor="expense-amount">Amount</Label>
                <Input 
                  id="expense-amount" 
                  type="number" 
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="expense-category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                >
                  <SelectTrigger id="expense-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expense-description">Description (Optional)</Label>
                <Input 
                  id="expense-description" 
                  placeholder="What was this for?"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
              </div>
              <Button 
                className="w-full mt-2"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(getExpensesByCategory()).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between items-center text-sm">
                    <span className="capitalize">{category}</span>
                    <span className="font-medium">{formatCurrency(amount)} ({Math.round((amount / stats.spent) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mt-1">
                    <div 
                      className={`${getCategoryDetails(category).color} h-2 rounded-full`} 
                      style={{ width: `${(amount / stats.spent) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm overflow-hidden">
        <CardHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Recent Expenses</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {expenses.slice().reverse().slice(0, 5).map(expense => {
              const { icon, color } = getCategoryDetails(expense.category);
              
              return (
                <div key={expense.id} className="p-4 flex items-center">
                  <div className={`w-10 h-10 rounded-full ${color.replace('bg-', 'bg-').replace('500', '100')} dark:${color.replace('bg-', 'bg-').replace('500', '900')}/30 flex items-center justify-center mr-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${color.replace('bg-', 'text-').replace('500', '600')} dark:${color.replace('bg-', 'text-').replace('500', '400')}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{expense.description}</h4>
                      <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="capitalize">{expense.category}</span>
                      <span className="mx-1">•</span>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {expenses.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <p>No expenses yet. Add your first expense above.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// Helper functions
function getExpensesByCategory() {
  const result: Record<string, number> = {};
  
  initialExpenses.forEach(expense => {
    if (result[expense.category]) {
      result[expense.category] += expense.amount;
    } else {
      result[expense.category] = expense.amount;
    }
  });
  
  return result;
}
