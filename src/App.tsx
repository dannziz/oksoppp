import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Book, 
  Users, 
  Terminal, 
  Battery, 
  Signal, 
  AlertTriangle,
  FileText,
  Radio,
  Target,
  Plus,
  Trash2,
  Edit2,
  Settings,
  Eye,
  Lock,
  Search,
  Crosshair,
  Wifi,
  Cpu,
  Database,
  Activity,
  Zap,
  HardDrive,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Page {
  id: string;
  title: string;
  icon: string;
  content: string;
}

interface Faction {
  name: string;
  status: 'СОЮЗНИК' | 'НЕЙТРАЛИТЕТ' | 'ВРАЖДЕБНОСТЬ';
}

const ICON_MAP: Record<string, any> = {
  Shield,
  Book,
  Users,
  FileText,
  Radio,
  Target,
  Terminal,
  Settings,
  AlertTriangle,
  Eye,
  Lock,
  Search,
  Wifi,
  Cpu,
  Database,
  Crosshair,
  Activity,
  Zap,
  HardDrive,
  Info
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('oksop');
  const [booting, setBooting] = useState(true);
  const [time, setTime] = useState(new Date());
  
  // Admin State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [adminTab, setAdminTab] = useState<'auth' | 'pages' | 'factions' | 'settings'>('auth');
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  // Content State
  const [siteTitle, setSiteTitle] = useState('ЦЕНТРАЛЬНЫЙ ТЕРМИНАЛ ОКСОП');
  
  const [pages, setPages] = useState<Page[]>([
    { 
      id: 'oksop', 
      title: 'ИНФО_ОКСОП', 
      icon: 'Shield', 
      content: 'ОКСОП — ОБЪЕДИНЕННЫЙ КОРПУС СИЛ ОХРАНЫ ПЕРИМЕТРА\n\nОБЩИЕ СВЕДЕНИЯ:\nОКСОП (Объединенный Корпус Сил Охраны Приметра) является единственным официальным государственным представительством в Чернобыльской Аномальной Зоне (ЧАЗ). Корпус сформирован под эгидой Совета Безопасности для выполнения критически важных задач по удержанию границ Зоны и обеспечению безопасности стратегических научных исследований.\n\nСТРУКТУРА КОРПУСА:\n- Группа Спецназначения "Альфа": Глубинная разведка, ликвидация особо опасных целей и поиск артефактов категории "Альфа".\n- Гарнизон Периметра: Тотальный контроль всех входов и выходов из ЧАЗ, патрулирование буферных зон.\n- Служба Безопасности НИИ: Охрана ученых, сопровождение экспедиций и пресечение утечек секретной информации.\n- Отдел Технического Обеспечения: Поддержание работоспособности систем РЛС, ПВО и автономных охранных комплексов.\n\nВООРУЖЕНИЕ И ЭКИПИРОВКА:\nНа вооружении Корпуса стоят самые современные образцы вооружения: автоматы серии АК-12, АС "Вал", снайперские винтовки СВДМ и ОСВ-96. Для работы в аномальных полях используются бронекостюмы "Булат-3" и экспериментальные экзоскелеты "Монолит-Стоп", обеспечивающие надежную защиту от радиации и механических повреждений.\n\nСТРАТЕГИЧЕСКИЕ ЦЕЛИ:\n1. Абсолютная изоляция ЧАЗ: Пресечение любых попыток незаконного пересечения периметра.\n2. Ресурсный Контроль: Изъятие и регистрация всех аномальных образований (артефактов).\n3. Антитеррор: Ликвидация незаконных вооруженных формирований и бандподполья в глубине Зоны.\n4. Научный Приоритет: Всемерная поддержка исследований НИИ ЧАЗ в интересах государственной безопасности.'
    },
    { 
      id: 'rules', 
      title: 'УСТАВ_HG', 
      icon: 'Book', 
      content: 'ОФИЦИАЛЬНЫЙ УСТАВ ВЗАИМОДЕЙСТВИЯ (HELLGATE STALKER RP)\n\nI. ПРОТОКОЛ КОНТАКТА\n- Любой субъект, обнаруженный патрулем, обязан нажать клавишу [C] (руки за голову) и оставаться на месте.\n- Попытка бегства или использование оружия в присутствии военного — ликвидация на месте.\n\nII. ЗОНА БЕЗОПАСНОСТИ\n- Вокруг всех баз ОКСОП установлена бесполетная и закрытая зона радиусом 150 метров.\n- Нахождение гражданских лиц в этой зоне без пропуска — огонь без предупреждения.\n\nIII. КОНТРОЛЬ СНАРЯЖЕНИЯ\n- Категорически запрещено ношение армейской формы и спецсредств лицами, не состоящими в штате Корпуса.\n- Запрещена фото- и видеофиксация лиц бойцов и офицеров (кроме репортеров с аккредитацией).\n\nIV. КОНТРАБАНДА И АРТЕФАКТЫ\n- Все найденные артефакты подлежат обязательной регистрации в НИИ.\n- Скрытое хранение артефактов приравнивается к хищению госсобственности.\n\nV. ОБЩИЕ ПРАВИЛА ПРОЕКТА\n- RP: Отыгрыш роли — приоритет №1.\n- FearRP: Боец обязан бояться смерти и превосходящих сил.\n- NonRP: Нарушение атмосферы карается администрацией проекта.'
    },
    { 
      id: 'network', 
      title: 'ДИПЛОМАТИЯ', 
      icon: 'Users', 
      content: ''
    }
  ]);

  const [factions, setFactions] = useState<Faction[]>([
    { name: 'Военные (ОКСОП)', status: 'СОЮЗНИК' },
    { name: 'Ученые (НИИ)', status: 'СОЮЗНИК' },
    { name: 'Одиночки / Сталкеры', status: 'НЕЙТРАЛИТЕТ' },
    { name: 'Долг', status: 'НЕЙТРАЛИТЕТ' },
    { name: 'Свобода', status: 'ВРАЖДЕБНОСТЬ' },
    { name: 'Наемники', status: 'ВРАЖДЕБНОСТЬ' },
    { name: 'Бандиты', status: 'ВРАЖДЕБНОСТЬ' },
    { name: 'Ренегаты', status: 'ВРАЖДЕБНОСТЬ' },
  ]);

  const handleAddFaction = () => {
    setFactions([...factions, { name: 'НОВАЯ ГРУППИРОВКА', status: 'НЕЙТРАЛИТЕТ' }]);
  };

  const deleteFaction = (index: number) => {
    setFactions(factions.filter((_, i) => i !== index));
  };

  const updateFaction = (index: number, field: keyof Faction, value: string) => {
    setFactions(factions.map((f, i) => i === index ? { ...f, [field]: value } : f));
  };

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2500);
    const timeTimer = setInterval(() => setTime(new Date()), 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey) {
        setIsAdminOpen(prev => {
          if (prev) {
            setIsAuthorized(false);
            setPasscodeInput('');
            setAdminTab('auth');
          }
          return !prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      clearInterval(timeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAddPage = () => {
    const newId = `page_${Date.now()}`;
    setPages([...pages, { id: newId, title: 'НОВЫЙ_МОДУЛЬ', icon: 'FileText', content: 'Введите данные...' }]);
    setEditingPageId(newId);
  };

  const deletePage = (id: string) => {
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (activeTab === id) setActiveTab(newPages[0]?.id || '');
  };

  const updatePage = (id: string, field: keyof Page, value: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  if (booting) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center font-mono text-[#ff9933] overflow-hidden pda-screen">
        <div className="noise-bg" />
        <div className="vignette" />
        <div className="scanline" />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-12"
          >
            <Shield className="w-40 h-40 mx-auto mb-6 text-[#ff9933] pda-text-glow animate-pulse" />
            <h1 className="text-5xl font-black italic tracking-[0.8em] pda-text-glow">OKXOP_UPLINK</h1>
            <div className="mt-2 text-xs opacity-50 tracking-[0.4em]">MILITARY GRADE SECURE ENCRYPTION ACTIVE</div>
          </motion.div>
          <div className="w-80 h-[2px] bg-[#1a1a1a] mx-auto relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#ff9933] shadow-[0_0_15px_#ff9933]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-2 max-w-xs mx-auto text-[10px] uppercase tracking-widest opacity-40">
            <div className="text-left">Kernel: v0311.2a</div>
            <div className="text-right">OS: HG_MIL_X</div>
            <div className="text-left">Status: Syncing</div>
            <div className="text-right">Auth: Pending</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0a0a] text-[#ff9933] font-mono overflow-hidden relative select-none pda-screen">
      <div className="noise-bg" />
      <div className="vignette" />
      <div className="scanline" />
      <div className="crt-overlay" />
      <div className="absolute inset-0 tactical-grid opacity-20 pointer-events-none" />
      
      {/* Admin Panel */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-8 backdrop-blur-xl"
          >
            <div className="w-full max-w-5xl bg-[#0d0d0d] border-4 border-red-600/50 p-10 shadow-[0_0_150px_rgba(255,0,0,0.4)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              
              <div className="flex items-center justify-between mb-10 border-b border-red-900/50 pb-6">
                <div>
                  <h2 className="text-4xl font-black italic text-red-600 flex items-center gap-6">
                    <Lock className="w-10 h-10" /> КОРНЕВОЙ_ТЕРМИНАЛ
                  </h2>
                  <p className="text-[10px] text-red-900 mt-2 tracking-[0.3em] font-black">ACCESS LEVEL: COMMANDER_AUTHORIZED</p>
                </div>
                <button 
                  onClick={() => setIsAdminOpen(false)}
                  className="px-8 py-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all font-black text-xs tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                >
                  ЗАКРЫТЬ
                </button>
              </div>

              {!isAuthorized ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-red-600 mb-10 uppercase tracking-[0.8em] text-sm font-black pda-text-glow">Введите код доступа</div>
                  <div className="flex gap-6 mb-12">
                    {[0, 1, 2, 3].map((_, i) => (
                      <div key={i} className={`w-16 h-20 border-4 flex items-center justify-center text-4xl font-black transition-all ${passcodeInput.length > i ? 'border-red-600 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)] bg-red-600/10' : 'border-red-900/20 text-red-900/20'}`}>
                        {passcodeInput[i] ? '*' : ''}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-6 w-80">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLR', 0, 'ENT'].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => {
                          if (btn === 'CLR') setPasscodeInput('');
                          else if (btn === 'ENT') {
                            if (passcodeInput === '0311') {
                              setIsAuthorized(true);
                              setAdminTab('pages');
                            } else {
                              setPasscodeInput('');
                            }
                          } else if (typeof btn === 'number' && passcodeInput.length < 4) {
                            const newCode = passcodeInput + btn;
                            setPasscodeInput(newCode);
                            if (newCode === '0311') {
                              setIsAuthorized(true);
                              setAdminTab('pages');
                            }
                          }
                        }}
                        className="h-16 border-2 border-red-900/40 text-red-600 hover:bg-red-600 hover:text-white font-black text-xl transition-all hover:scale-105 active:scale-95"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-[65vh]">
                  <div className="flex gap-6 mb-8 border-b border-red-900/20 pb-6">
                    <AdminTabBtn active={adminTab === 'pages'} onClick={() => setAdminTab('pages')}>КОНТЕНТ</AdminTabBtn>
                    <AdminTabBtn active={adminTab === 'factions'} onClick={() => setAdminTab('factions')}>ДИПЛОМАТИЯ</AdminTabBtn>
                    <AdminTabBtn active={adminTab === 'settings'} onClick={() => setAdminTab('settings')}>СИСТЕМА</AdminTabBtn>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-6 scrollbar-stalker">
                    {adminTab === 'pages' && (
                      <div className="space-y-8">
                        <button onClick={handleAddPage} className="w-full p-6 border-2 border-dashed border-red-600/40 text-red-600 hover:bg-red-600/10 flex items-center justify-center gap-4 font-black text-sm tracking-widest transition-all">
                          <Plus className="w-6 h-6" /> СОЗДАТЬ_НОВУЮ_СТРАНИЦУ
                        </button>
                        {pages.map(page => (
                          <div key={page.id} className="border-2 border-red-900/20 bg-black/40 p-6 relative group">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-6">
                                <div className="p-3 bg-red-600/10 border border-red-600/30">
                                  {React.createElement(ICON_MAP[page.icon] || FileText, { className: 'w-6 h-6 text-red-600' })}
                                </div>
                                <div>
                                  <span className="font-black italic text-xl uppercase text-red-500">{page.title}</span>
                                  <div className="text-[10px] text-red-900 font-bold uppercase mt-1 tracking-tighter">ID: {page.id}</div>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <button onClick={() => setEditingPageId(editingPageId === page.id ? null : page.id)} className="p-2 border border-red-900/30 text-red-600 hover:bg-red-600 hover:text-white transition-all"><Edit2 className="w-5 h-5" /></button>
                                <button onClick={() => deletePage(page.id)} className="p-2 border border-red-900/30 text-red-900 hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                              </div>
                            </div>
                            {editingPageId === page.id && (
                              <div className="space-y-6 pt-6 border-t border-red-900/20">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <label className="text-[10px] text-red-900 block mb-2 font-black uppercase tracking-widest">Заголовок модуля</label>
                                    <input 
                                      className="w-full bg-black border-2 border-red-900/30 p-4 text-sm text-red-600 outline-none focus:border-red-600 transition-all font-black"
                                      value={page.title}
                                      onChange={(e) => updatePage(page.id, 'title', e.target.value.toUpperCase())}
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[10px] text-red-900 block mb-2 font-black uppercase tracking-widest">Протокол иконки</label>
                                    <select 
                                      className="w-full bg-black border-2 border-red-900/30 p-4 text-sm text-red-600 outline-none focus:border-red-600 transition-all font-black appearance-none"
                                      value={page.icon}
                                      onChange={(e) => updatePage(page.id, 'icon', e.target.value)}
                                    >
                                      {Object.keys(ICON_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[10px] text-red-900 block mb-2 font-black uppercase tracking-widest">Матрица данных (Текст)</label>
                                  <textarea 
                                    className="w-full bg-black border-2 border-red-900/30 p-4 text-sm text-red-600 outline-none focus:border-red-600 transition-all font-sans min-h-[200px]"
                                    value={page.content}
                                    onChange={(e) => updatePage(page.id, 'content', e.target.value)}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {adminTab === 'factions' && (
                      <div className="space-y-8">
                        <button onClick={handleAddFaction} className="w-full p-6 border-2 border-dashed border-red-600/40 text-red-600 hover:bg-red-600/10 flex items-center justify-center gap-4 font-black text-sm tracking-widest transition-all">
                          <Plus className="w-6 h-6" /> ДОБАВИТЬ_ГРУППИРОВКУ
                        </button>
                        <div className="grid grid-cols-2 gap-6">
                          {factions.map((f, idx) => (
                            <div key={idx} className="border-2 border-red-900/20 p-6 bg-black/40 relative group">
                              <button 
                                onClick={() => deleteFaction(idx)}
                                className="absolute top-4 right-4 p-2 text-red-900 hover:text-red-600 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <label className="text-[9px] text-red-900 block mb-2 font-black uppercase">ИДЕНТИФИКАТОР ГРУППЫ</label>
                              <input 
                                className="w-full bg-black border-b-2 border-red-900/30 mb-6 p-2 text-lg font-black text-red-500 outline-none focus:border-red-600 transition-all uppercase"
                                value={f.name}
                                onChange={(e) => updateFaction(idx, 'name', e.target.value.toUpperCase())}
                              />
                              <div className="flex gap-2">
                                {(['СОЮЗНИК', 'НЕЙТРАЛИТЕТ', 'ВРАЖДЕБНОСТЬ'] as const).map(s => (
                                  <button
                                    key={s}
                                    onClick={() => updateFaction(idx, 'status', s)}
                                    className={`flex-1 text-[10px] p-3 border-2 font-black transition-all ${f.status === s ? 'bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'border-red-900/30 text-red-900 hover:text-red-600 hover:border-red-600'}`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {adminTab === 'settings' && (
                      <div className="space-y-10">
                         <div className="p-8 border-2 border-red-600/20 bg-red-600/5">
                            <label className="text-xs text-red-900 block mb-4 uppercase tracking-[0.4em] font-black italic">ИМЯ_СИСТЕМЫ_ПДА</label>
                            <input 
                              className="w-full bg-black border-4 border-red-900/30 p-6 text-red-600 font-black italic text-3xl outline-none focus:border-red-600 transition-all shadow-inner"
                              value={siteTitle}
                              onChange={(e) => setSiteTitle(e.target.value.toUpperCase())}
                            />
                         </div>
                         <div className="p-10 border-l-[16px] border-red-600 bg-red-900/10 text-sm text-red-600 leading-relaxed font-black uppercase italic tracking-wider">
                           ДИРЕКТИВА БЕЗОПАСНОСТИ: Вся ответственность за изменение системных параметров лежит на операторе. Любое отклонение от устава будет караться трибуналом. Код 0311 подтвержден. 
                         </div>
                         <div className="grid grid-cols-3 gap-6">
                            <div className="p-6 border-2 border-red-900/20 text-center">
                               <div className="text-[10px] text-red-900 mb-2 font-bold uppercase">RAM_USAGE</div>
                               <div className="text-2xl font-black text-red-600 italic">82.4 GB</div>
                            </div>
                            <div className="p-6 border-2 border-red-900/20 text-center">
                               <div className="text-[10px] text-red-900 mb-2 font-bold uppercase">CPU_LOAD</div>
                               <div className="text-2xl font-black text-red-600 italic">14.0%</div>
                            </div>
                            <div className="p-6 border-2 border-red-900/20 text-center">
                               <div className="text-[10px] text-red-900 mb-2 font-bold uppercase">NET_LATENCY</div>
                               <div className="text-2xl font-black text-red-600 italic">2.4ms</div>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interface */}
      <div className="h-screen flex flex-col relative">
        {/* Header Bar */}
        <div className="h-20 bg-[#0d0d0d] border-b-2 border-[#ff9933]/30 flex items-center px-10 justify-between z-10 shadow-[0_15px_40px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff9933]/40 to-transparent" />
          
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="p-2 border border-green-500/50 bg-green-500/5">
                <Signal className="w-5 h-5 text-green-500 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase italic tracking-widest text-green-500">NETWORK: STABLE</span>
                <span className="text-[8px] font-bold text-green-900">UPLINK_ENCRYPTED_AES256</span>
              </div>
            </div>
            <div className="flex items-center gap-4 opacity-50">
              <Cpu className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest">MIL_CORE: 0311</span>
                <span className="text-[8px] font-bold uppercase tracking-tighter">TEMP: 42°C | FAN: 1200RPM</span>
              </div>
            </div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
            <div className="text-4xl font-black italic pda-text-glow tracking-[0.2em] w-64 text-center">{time.toLocaleTimeString()}</div>
            <div className="w-[2px] h-10 bg-[#ff9933]/20" />
            <div className="flex flex-col items-center">
               <div className="text-[14px] font-black pda-text-glow uppercase italic tracking-[0.4em]">{siteTitle}</div>
               <div className="text-[8px] font-bold opacity-30 mt-1 uppercase tracking-[0.5em]">Sector: Chernobyl-Z_03</div>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
               <div className="flex flex-col text-right">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">DATA_FEED</span>
                  <span className="text-[8px] font-bold text-blue-900 uppercase">SAT_SYNC_99%</span>
               </div>
               <div className="p-2 border border-blue-400/50 bg-blue-400/5">
                <Database className="w-5 h-5 text-blue-400" />
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex flex-col text-right">
                  <span className="text-[14px] font-black tracking-tighter">94.2%</span>
                  <div className="w-12 h-1 bg-[#1a1a1a] mt-1 overflow-hidden">
                    <div className="h-full bg-green-500 w-[94.2%]" />
                  </div>
               </div>
               <Battery className="w-7 h-7 text-green-500" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Side Menu */}
          <div className="w-40 bg-[#0d0d0d] border-r-2 border-[#ff9933]/20 flex flex-col py-10 gap-8 items-center shadow-[30px_0_60px_rgba(0,0,0,0.6)] z-20 overflow-y-auto scrollbar-stalker relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff9933]/20 to-transparent" />
            {pages.map(page => (
              <NavButton 
                key={page.id}
                icon={React.createElement(ICON_MAP[page.icon] || FileText)}
                label={page.title}
                active={activeTab === page.id}
                onClick={() => setActiveTab(page.id)}
              />
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
             <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none overflow-hidden">
                <Shield className="w-[800px] h-[800px] text-[#ff9933]" />
             </div>
             
             {/* Tactical Overlays */}
             <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#ff9933]/20 pointer-events-none m-4" />
             <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#ff9933]/20 pointer-events-none m-4" />
             <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#ff9933]/20 pointer-events-none m-4" />
             <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#ff9933]/20 pointer-events-none m-4" />
             
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, scale: 0.98, filter: 'blur(20px)' }}
                 animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, scale: 1.02, filter: 'blur(20px)' }}
                 transition={{ duration: 0.25, ease: "circOut" }}
                 className="h-full w-full"
               >
                 {activeTab === 'network' ? (
                   <NetworkSection factions={factions} />
                 ) : (
                   <div className="p-20 h-full overflow-y-auto scrollbar-stalker max-w-7xl mx-auto pb-60 relative">
                     <PageContent 
                       title={pages.find(p => p.id === activeTab)?.title || ''} 
                       content={pages.find(p => p.id === activeTab)?.content || ''}
                       icon={pages.find(p => p.id === activeTab)?.icon || 'FileText'}
                     />
                   </div>
                 )}
               </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="h-10 bg-[#0d0d0d] border-t-2 border-[#ff9933]/10 flex items-center px-10 justify-between text-[10px] font-black z-10 tracking-[0.3em] relative overflow-hidden italic uppercase">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#ff9933]/5" />
          
          <div className="ticker-wrap flex-1 mr-20 opacity-40">
            <div className="ticker">
              /// ВНИМАНИЕ: ПОВЫШЕННЫЙ УРОВЕНЬ АНОМАЛЬНОЙ АКТИВНОСТИ В СЕКТОРЕ "РЫЖИЙ ЛЕС" /// ВСЕМ ПАТРУЛЯМ ПЕРЕЙТИ НА ЧАСТОТУ 144.5 /// ПРИКАЗ 0311: ПРОВЕРКА БИОМЕТРИЧЕСКИХ ДАННЫХ ВСЕХ СТАЛКЕРОВ В РАЙОНЕ КОРДОНА /// НИИ ЧАЗ ПОДТВЕРЖДАЕТ СТАБИЛИЗАЦИЮ ПСИ-ИЗЛУЧЕНИЯ ///
            </div>
          </div>

          <div className="flex items-center gap-10 opacity-60">
             <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-green-500" />
                <span>HEART_RATE: 72 BPM</span>
             </div>
             <div className="w-[1px] h-4 bg-white/10" />
             <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>RADIO_FREQ: 14.2 MHZ</span>
             </div>
             <div className="w-[1px] h-4 bg-white/10" />
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                <span className="text-red-600">MIL_UPLINK: ACTIVE</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const NavButton: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-28 h-28 flex flex-col items-center justify-center transition-all duration-300 relative border-2 p-2 group ${
      active 
      ? 'bg-[#ff9933]/10 text-[#ff9933] border-[#ff9933]/40 shadow-[0_0_30px_rgba(255,153,51,0.2)] scale-110' 
      : 'text-white/20 border-white/5 hover:text-white/60 hover:bg-white/5 hover:border-[#ff9933]/20'
    }`}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: `w-8 h-8 mb-3 ${active ? 'pda-text-glow' : ''}` })}
    </div>
    <span className={`text-[9px] font-black tracking-tighter uppercase text-center w-full px-1 leading-tight ${active ? 'pda-text-glow' : ''}`}>{label}</span>
    
    {active && (
      <>
        <div className="absolute left-[-4px] top-0 bottom-0 w-[4px] bg-[#ff9933] shadow-[0_0_15px_#ff9933]" />
        <div className="absolute right-[-4px] top-0 bottom-0 w-[4px] bg-[#ff9933]/20" />
      </>
    )}
    
    {/* Corner accents */}
    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${active ? 'border-[#ff9933]' : 'border-transparent'}`} />
    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${active ? 'border-[#ff9933]' : 'border-transparent'}`} />
    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${active ? 'border-[#ff9933]' : 'border-transparent'}`} />
    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${active ? 'border-[#ff9933]' : 'border-transparent'}`} />
  </button>
);

const AdminTabBtn: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 text-[12px] font-black border-2 transition-all italic tracking-[0.2em] uppercase ${
      active ? 'bg-red-600 text-white border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.5)]' : 'text-red-600 border-red-900/30 hover:border-red-600/60'
    }`}
  >
    {children}
  </button>
);

const PageContent: React.FC<{ title: string, content: string, icon: string }> = ({ title, content, icon }) => (
  <div className="space-y-16">
    <div className="flex items-center justify-between border-b-8 border-[#ff9933]/10 pb-12 relative">
      <div className="absolute bottom-[-8px] left-0 w-40 h-2 bg-[#ff9933] shadow-[0_0_20px_#ff9933]" />
      
      <div className="flex items-center gap-12">
        <div className="p-6 bg-[#ff9933]/5 border-2 border-[#ff9933]/20 shadow-2xl">
          {React.createElement(ICON_MAP[icon] || FileText, { className: 'w-16 h-16 pda-text-glow' })}
        </div>
        <div>
          <h1 className="text-7xl font-black italic tracking-tighter pda-text-glow uppercase">
            {title}
          </h1>
          <div className="flex gap-6 mt-4 text-[10px] font-black uppercase opacity-40 tracking-[0.5em]">
             <span>REF_ID: HG_MIL_{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
             <span className="border-l border-white/20 pl-6">SECURITY_LEVEL: 3_MIL</span>
          </div>
        </div>
      </div>
      
      <div className="text-right hidden xl:block">
        <div className="flex gap-4 items-center justify-end mb-2">
           <HardDrive className="w-4 h-4 text-blue-400" />
           <span className="text-[10px] font-black uppercase opacity-60">DISK_SYSTEM_OK</span>
        </div>
        <div className="flex gap-4 items-center justify-end">
           <Activity className="w-4 h-4 text-green-500" />
           <span className="text-[10px] font-black uppercase opacity-60">UPLINK_ENCRYPTED</span>
        </div>
      </div>
    </div>

    <div className="text-2xl leading-[1.8] font-sans text-white/90 whitespace-pre-wrap max-w-6xl">
      {content.split('\n').map((line, i) => {
        const isHeader = line.toUpperCase() === line && line.length > 5 && !line.startsWith('-') && !line.match(/^\d+\./);
        const isBullet = line.trim().startsWith('-');
        
        return (
          <p key={i} className={`
            ${isHeader ? 'mt-20 mb-8 text-4xl font-black text-[#ff9933] bg-[#ff9933]/5 p-8 border-l-[16px] border-[#ff9933] shadow-2xl italic tracking-widest relative overflow-hidden' : ''}
            ${isBullet ? 'ml-12 flex gap-6 opacity-80 font-bold border-l-4 border-white/5 pl-8 my-4 py-2 hover:bg-white/5 transition-colors' : 'my-6'}
            ${!isHeader && !isBullet ? 'opacity-70 pl-4 border-l-2 border-[#ff9933]/10' : ''}
          `}>
            {isHeader && <div className="absolute top-0 right-0 w-32 h-full bg-[#ff9933]/5 -skew-x-12 translate-x-10" />}
            {isBullet && <span className="text-[#ff9933] text-3xl mt-[-4px]">»</span>}
            {line}
          </p>
        );
      })}
    </div>

    {title.includes('ОКСОП') && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-24">
         <div className="p-10 border-4 border-[#ff9933]/10 bg-[#0d0d0d] shadow-2xl relative overflow-hidden group border-l-[20px] border-l-[#ff9933]/30">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff9933]/5 -rotate-45 translate-x-20 -translate-y-20" />
            <h3 className="text-xl font-black mb-10 flex items-center gap-6 text-[#ff9933] uppercase italic border-b-2 border-[#ff9933]/10 pb-6 tracking-widest">
              <Target className="w-10 h-10 text-red-600 animate-pulse" /> ТЕКУЩИЕ БОЕВЫЕ ЗАДАЧИ
            </h3>
            <div className="space-y-8">
              {[
                'Обнаружить и ликвидировать лидера НВФ в секторе Припять.',
                'Обеспечить охрану конвоя снабжения НИИ ЧАЗ.',
                'Провести зачистку аномального поля в Секторе-4.',
                'Найти и вернуть экспериментальное оборудование "Гром-1".'
              ].map((t, idx) => (
                <div key={idx} className="flex gap-8 items-center group-hover:translate-x-4 transition-all duration-300">
                  <div className="w-3 h-3 bg-red-600 rotate-45 flex-shrink-0" />
                  <span className="text-[14px] font-black uppercase tracking-widest leading-tight opacity-80">{t}</span>
                </div>
              ))}
            </div>
         </div>
         <div className="p-10 border-4 border-red-600/20 bg-red-900/5 shadow-[0_0_80px_rgba(255,0,0,0.15)] border-l-[20px] border-l-red-600">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-8 text-red-600 uppercase italic border-b-2 border-red-600/20 pb-6 tracking-widest">
              <AlertTriangle className="w-12 h-12 animate-bounce" /> ДИРЕКТИВА №0311
            </h3>
            <p className="text-[16px] font-black italic leading-relaxed tracking-wider text-red-600/80">
              ВНИМАНИЕ ОПЕРАТИВНИКАМ: Согласно протоколу "Омега", любые неопознанные летающие или наземные объекты в зоне 150м вокруг объектов ОКСОП подлежат немедленной ликвидации без предупреждения. Применение оружия разрешено без предварительного доклада в штаб сектора. Огонь на поражение подтвержден высшим командованием.
            </p>
            <div className="mt-10 flex justify-between items-end">
               <div className="text-[10px] text-red-900 font-black uppercase tracking-[0.5em]">Auth: General_Petrenko</div>
               <Info className="w-8 h-8 text-red-900/40" />
            </div>
         </div>
      </div>
    )}
  </div>
);

const NetworkSection: React.FC<{ factions: Faction[] }> = ({ factions }) => (
  <div className="p-20 h-full overflow-y-auto scrollbar-stalker max-w-7xl mx-auto pb-60">
    <div className="flex items-center justify-between border-b-8 border-blue-600/10 pb-12 mb-20 relative">
      <div className="absolute bottom-[-8px] left-0 w-40 h-2 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
      
      <div className="flex items-center gap-12">
        <div className="p-6 bg-blue-600/5 border-2 border-blue-600/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/20 animate-ping opacity-20" />
          <Users className="w-16 h-16 text-blue-600 pda-text-glow relative z-10" />
        </div>
        <div>
          <h2 className="text-7xl font-black italic tracking-tighter pda-text-glow uppercase">
            ДИПЛО_МАТРИЦА
          </h2>
          <div className="flex gap-6 mt-4 text-[10px] font-black uppercase text-blue-400 tracking-[0.5em]">
             <span className="animate-pulse">SYNCHRONIZING_RELATIONS_DB...</span>
             <span className="border-l border-blue-900/30 pl-6">NODE: MIL_UPLINK_01</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-right">
        <div className="text-[10px] font-black text-blue-400/60 uppercase tracking-[0.3em]">Total Factions: {factions.length}</div>
        <div className="flex gap-2 justify-end">
          <div className="w-2 h-2 bg-green-500 shadow-[0_0_10px_green]" />
          <div className="w-2 h-2 bg-yellow-500 shadow-[0_0_10px_yellow]" />
          <div className="w-2 h-2 bg-red-500 shadow-[0_0_10px_red]" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-8 relative">
      <div className="absolute top-0 bottom-0 left-[-60px] w-[2px] bg-gradient-to-b from-transparent via-blue-600/30 to-transparent" />
      {factions.map((f, i) => (
        <motion.div 
          key={f.name + i}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="flex items-center justify-between p-10 border-4 border-white/5 bg-[#0d0d0d] shadow-2xl hover:bg-white/[0.03] transition-all group border-l-[25px] hover:border-l-[#ff9933] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          <div className="flex items-center gap-12 relative z-10">
            <div className={`w-14 h-14 rotate-45 border-4 transition-all duration-500 flex items-center justify-center ${
              f.status === 'СОЮЗНИК' ? 'bg-green-600 border-green-400 shadow-[0_0_30px_green]' :
              f.status === 'НЕЙТРАЛИТЕТ' ? 'bg-yellow-600 border-yellow-400 shadow-[0_0_30px_yellow]' :
              'bg-red-700 border-red-500 shadow-[0_0_30px_red]'
            }`}>
              <div className="rotate-[-45deg]">
                <Shield className="w-6 h-6 text-white/50" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-black italic tracking-widest uppercase group-hover:text-[#ff9933] transition-colors flex items-center gap-6">
                {f.name}
                <span className="text-xs opacity-20 font-mono font-normal tracking-normal border border-white/10 px-2 py-1">SEC_ID: 0x{Math.random().toString(16).substr(2, 4).toUpperCase()}</span>
              </div>
              <div className="flex gap-10 mt-3 opacity-30 text-[10px] font-black uppercase tracking-[0.4em]">
                <span className="flex items-center gap-3"><Activity className="w-3 h-3" /> RELATION: {f.status === 'СОЮЗНИК' ? '100%' : f.status === 'НЕЙТРАЛИТЕТ' ? '50%' : '0%'}</span>
                <span className="border-l border-white/10 pl-10 flex items-center gap-3"><Wifi className="w-3 h-3" /> INTEL_SRC: MIL_SAT_UPLINK</span>
                <span className="border-l border-white/10 pl-10 flex items-center gap-3"><Cpu className="w-3 h-3" /> PRIORITY: {f.status === 'ВРАЖДЕБНОСТЬ' ? 'CRITICAL' : 'LOW'}</span>
              </div>
            </div>
          </div>
          
          <div className={`px-12 py-5 border-4 font-black italic text-lg tracking-[0.3em] shadow-2xl transition-all relative z-10 min-w-[280px] text-center ${
            f.status === 'СОЮЗНИК' ? 'text-green-500 border-green-500 bg-green-500/10' :
            f.status === 'НЕЙТРАЛИТЕТ' ? 'text-yellow-500 border-yellow-500 bg-yellow-500/10' :
            'text-red-500 border-red-500 bg-red-500/10'
          }`}>
            {f.status}
            {f.status === 'ВРАЖДЕБНОСТЬ' && (
              <div className="absolute inset-0 bg-red-600/5 animate-pulse" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default App;
