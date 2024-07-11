'use client';

import { MdChevronLeft, MdOutlineMenu } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { useCloseOnOutSideClick } from '@/hooks/useCloseOnOutSide';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import HeaderButton from './HeaderButton';

interface Props {
  title: string;
  isBack?: boolean;
  backUrl?: string;
  customButton?: React.ReactNode;
  customMenu?: React.ReactNode;
}

export default function Header({ title, isBack, backUrl, customMenu, customButton }: Props) {
  const router = useRouter();
  const rightMenuModal = useModal();
  const headerRef = useRef<HTMLHeadElement | null>(null);

  useCloseOnOutSideClick({
    onClose: rightMenuModal.hide,
    excludeRefs: [headerRef],
  });

  const onBackPage = () => {
    if (backUrl) return router.push(backUrl);
    router.back();
  };

  const handleMenuButton = () => {
    rightMenuModal.toggle();
  };

  return (
    <header ref={headerRef} className="fixed m-auto left-0 right-0 bg-white z-50">
      <div className="w-sm md:w-md m-auto relative">
        <div className="py-4 px-1 flex items-center relative justify-between h-14 bg-white">
          {isBack ? (
            <HeaderButton
              icon={<MdChevronLeft aria-label="back-icon" color="#00000" size={24} />}
              onClick={onBackPage}
            />
          ) : (
            <div />
          )}

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-h4 font-bold text-slate-S900">{title}</h1>
          {customMenu ? (
            <button aria-label="menu-button" type="button" onClick={handleMenuButton}>
              <MdOutlineMenu size={24} />
            </button>
          ) : (
            customButton
          )}
        </div>

        {customMenu && (
          <AnimatePresence>
            {rightMenuModal.isVisible && (
              <motion.div
                initial={{
                  translateY: '-100%',
                  opacity: 0,
                }}
                animate={{
                  translateY: '0',
                  opacity: 1,
                }}
                exit={{
                  translateY: '-100%',
                  opacity: 0,
                }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.3,
                }}
                className="absolute right-4 min-w-[172px] bg-white shadow-md rounded-lg top-14 -z-10"
              >
                {customMenu}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  );
}
