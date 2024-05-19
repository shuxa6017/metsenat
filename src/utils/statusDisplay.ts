export const statusDisplay = (status: string) => {
  const statusVariants = {
    default: 'text-slate-500',
    Yangi: 'text-sky-500',
    Moderatsiyada: 'text-orange-500',
    Tasdiqlangan: 'text-lime-500'
  };

  return statusVariants[status];
};

export const userStatusDisplay = (status: string | undefined) => {
  const statusVariants = {
    default: 'text-slate-500 bg-slate-100',
    Yangi: 'text-sky-500 bg-sky-100',
    Moderatsiyada: 'text-orange-500 bg-orange-100',
    Tasdiqlangan: 'text-lime-500 bg-green-100'
  };

  return statusVariants[status];
};
