import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
type Category = 'lore' | 'characters' | 'bestiary' | 'herbarium' | 'shop' | 'equipment';

interface DatabaseItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  rarity: Rarity;
  level?: number;
  type?: string;
  price?: number;
}

const mockData: DatabaseItem[] = [
  { id: '1', title: 'История Риверфордж', description: 'Древний город на берегу реки Форж, основанный в эпоху первых королей. Его стены помнят тысячи битв и легенд.', category: 'lore', rarity: 'legendary', type: 'История' },
  { id: '2', title: 'Легенда о Железном Мосте', description: 'Мост, построенный великим кузнецом Торальдом, который не ржавеет уже 300 лет.', category: 'lore', rarity: 'epic', type: 'Легенда' },
  { id: '3', title: 'Книга забытых рун', description: 'Древний манускрипт с описанием утерянных магических символов.', category: 'lore', rarity: 'rare', type: 'Артефакт' },
  
  { id: '4', title: 'Альдрик Железнорукий', description: 'Кузнец и воин, мастер легендарных клинков. Потерял руку в бою с драконом.', category: 'characters', rarity: 'legendary', level: 45, type: 'NPC' },
  { id: '5', title: 'Элиана Лунная Тень', description: 'Таинственная эльфийка-разведчица, хранящая секреты древних лесов.', category: 'characters', rarity: 'epic', level: 38, type: 'NPC' },
  { id: '6', title: 'Граф Мортимер', description: 'Правитель Риверфордж, известный своей мудростью и жестокостью.', category: 'characters', rarity: 'rare', level: 50, type: 'Квестодатель' },
  
  { id: '7', title: 'Речной Дракон', description: 'Огромное чешуйчатое существо, обитающее в глубинах реки Форж. Дышит паром и ядовитой водой.', category: 'bestiary', rarity: 'legendary', level: 60, type: 'Босс' },
  { id: '8', title: 'Лесной Тролль', description: 'Массивный гуманоид с регенерацией. Слаб к огню.', category: 'bestiary', rarity: 'uncommon', level: 20, type: 'Враг' },
  { id: '9', title: 'Призрак Рыцаря', description: 'Неупокоенная душа павшего воина. Патрулирует старое кладбище.', category: 'bestiary', rarity: 'rare', level: 30, type: 'Нежить' },
  
  { id: '10', title: 'Лунный Цветок', description: 'Редкое растение, цветущее только в полнолуние. Используется в зельях невидимости.', category: 'herbarium', rarity: 'epic', type: 'Алхимия' },
  { id: '11', title: 'Корень Железного Дуба', description: 'Твёрдый корень древнего дерева. Увеличивает защиту.', category: 'herbarium', rarity: 'uncommon', type: 'Ингредиент' },
  { id: '12', title: 'Огненная Ягода', description: 'Жгучий плод, растущий на вулканических склонах.', category: 'herbarium', rarity: 'rare', type: 'Ингредиент' },
  
  { id: '13', title: 'Зелье Великого Исцеления', description: 'Восстанавливает 500 единиц здоровья мгновенно.', category: 'shop', rarity: 'rare', price: 150, type: 'Расходник' },
  { id: '14', title: 'Свиток Телепортации', description: 'Мгновенно переносит к последнему костру.', category: 'shop', rarity: 'uncommon', price: 50, type: 'Расходник' },
  { id: '15', title: 'Эликсир Опыта', description: 'Удваивает получаемый опыт на 1 час.', category: 'shop', rarity: 'epic', price: 300, type: 'Бафф' },
  
  { id: '16', title: 'Клинок Драконьей Пасти', description: 'Легендарный меч, выкованный из зуба древнего дракона. +150 к атаке, 20% шанс поджечь врага.', category: 'equipment', rarity: 'legendary', level: 50, price: 5000, type: 'Оружие' },
  { id: '17', title: 'Кольчуга Стража', description: 'Прочная броня королевской гвардии. +80 к защите.', category: 'equipment', rarity: 'rare', level: 30, price: 800, type: 'Броня' },
  { id: '18', title: 'Амулет Мудреца', description: 'Увеличивает регенерацию маны на 50%.', category: 'equipment', rarity: 'epic', level: 25, price: 1200, type: 'Аксессуар' },
];

const rarityColors: Record<Rarity, string> = {
  common: 'bg-gray-600',
  uncommon: 'bg-green-600',
  rare: 'bg-blue-600',
  epic: 'bg-purple-600',
  legendary: 'bg-yellow-600'
};

const categoryIcons: Record<Category, string> = {
  lore: 'BookOpen',
  characters: 'Users',
  bestiary: 'Skull',
  herbarium: 'Leaf',
  shop: 'ShoppingBag',
  equipment: 'Sword'
};

const categoryNames: Record<Category, string> = {
  lore: 'Лор',
  characters: 'Персонажи',
  bestiary: 'Бестиарий',
  herbarium: 'Гербарий',
  shop: 'Магазин',
  equipment: 'Экипировка'
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<Category>('lore');
  const [searchQuery, setSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredData = mockData.filter(item => {
    if (item.category !== activeTab) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (rarityFilter !== 'all' && item.rarity !== rarityFilter) return false;
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    if (levelFilter !== 'all') {
      const level = item.level || 0;
      if (levelFilter === '1-20' && (level < 1 || level > 20)) return false;
      if (levelFilter === '21-40' && (level < 21 || level > 40)) return false;
      if (levelFilter === '41+' && level < 41) return false;
    }
    return true;
  });

  const types = [...new Set(mockData.filter(i => i.category === activeTab).map(i => i.type).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Castle" size={48} className="text-primary" />
          <h1 className="text-5xl md:text-7xl font-bold text-primary text-shadow-gold">
            РИВЕРФОРДЖ
          </h1>
        </div>
        <p className="text-xl text-muted-foreground italic">История вечного проклятия</p>
        <div className="mt-4 h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      </header>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Category)} className="max-w-7xl mx-auto">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-card/50 p-2 medieval-border mb-8">
          {(Object.keys(categoryNames) as Category[]).map((cat) => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Icon name={categoryIcons[cat]} size={18} />
              <span className="hidden md:inline">{categoryNames[cat]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mb-8 p-6 bg-card/50 rounded-lg medieval-border parchment-texture animate-scale-in">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-xl font-semibold">Фильтры поиска</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Редкость" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая редкость</SelectItem>
                <SelectItem value="common">Обычная</SelectItem>
                <SelectItem value="uncommon">Необычная</SelectItem>
                <SelectItem value="rare">Редкая</SelectItem>
                <SelectItem value="epic">Эпическая</SelectItem>
                <SelectItem value="legendary">Легендарная</SelectItem>
              </SelectContent>
            </Select>

            {types.length > 0 && (
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой тип</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type!}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {mockData.some(i => i.category === activeTab && i.level) && (
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой уровень</SelectItem>
                  <SelectItem value="1-20">1-20</SelectItem>
                  <SelectItem value="21-40">21-40</SelectItem>
                  <SelectItem value="41+">41+</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {(searchQuery || rarityFilter !== 'all' || typeFilter !== 'all' || levelFilter !== 'all') && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchQuery('');
                setRarityFilter('all');
                setTypeFilter('all');
                setLevelFilter('all');
              }}
              className="mt-4 text-muted-foreground hover:text-primary"
            >
              <Icon name="X" size={16} className="mr-2" />
              Сбросить фильтры
            </Button>
          )}
        </div>

        {(Object.keys(categoryNames) as Category[]).map((cat) => (
          <TabsContent key={cat} value={cat} className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-xl text-muted-foreground">Ничего не найдено</p>
                  <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
                </div>
              ) : (
                filteredData.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className="medieval-border parchment-texture hover-lift bg-card/80"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-xl text-primary flex items-center gap-2">
                          <Icon name={categoryIcons[item.category]} size={20} />
                          {item.title}
                        </CardTitle>
                        <Badge className={`${rarityColors[item.rarity]} text-white shrink-0`}>
                          {item.rarity}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item.type && (
                          <Badge variant="outline" className="border-primary/30">
                            <Icon name="Tag" size={12} className="mr-1" />
                            {item.type}
                          </Badge>
                        )}
                        {item.level && (
                          <Badge variant="outline" className="border-secondary/30">
                            <Icon name="TrendingUp" size={12} className="mr-1" />
                            Ур. {item.level}
                          </Badge>
                        )}
                        {item.price && (
                          <Badge variant="outline" className="border-yellow-600/30">
                            <Icon name="Coins" size={12} className="mr-1" />
                            {item.price} золота
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <footer className="text-center mt-16 pt-8 border-t border-border/50">
        <p className="text-muted-foreground italic">
          «В каждом камне Риверфордж — история, в каждой тени — тайна»
        </p>
      </footer>
    </div>
  );
};

export default Index;