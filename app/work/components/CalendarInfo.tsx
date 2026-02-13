"use client";

import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from "@fullcalendar/interaction";
import styles from "./styles/Calendar.module.scss";
import { AnimatePresence, motion } from "framer-motion";
interface ICalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
}

interface ICalendarProps {
  events: ICalendarEvent[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onMonthChange: (month: string) => void;
}

export const EVENTS: ICalendarEvent[] = [
  {
    id: "1",
    title: "5가지 AI 실습으로 완성하는 상품기획 원데이 클래스",
    date: "2026-02-04",
    time: "13:00",
  },
  {
    id: "2",
    title: "AI와 엑셀로 끝내는 비즈니스 데이터 분석",
    date: "2026-02-05",
    time: "13:00",
  },
  {
    id: "3",
    title: "B2B 영업 성과 극대화 실전 클래스",
    date: "2026-02-06",
    time: "13:00",
  },
  {
    id: "4",
    title: "B2B 영업 성과 극대화 실전 클래스",
    date: "2026-03-06",
    time: "13:00",
  },
];

// 로컬 날짜 YYYY-MM-DD (타임존 이슈 방지 - dateClick의 dateStr과 동일 기준)
const toLocalDateString = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getTodayString = () => toLocalDateString(new Date());

const getCurrentMonth = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};

const Calendar = ({
  events,
  selectedDate,
  onSelectDate,
  onMonthChange,
}: ICalendarProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const eventDates = new Set(events.map((e) => e.date));

  return (
    <div className="flex flex-col">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={getTodayString()} // 🔥 오늘 날짜로 초기화
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next today",
        }}
        fixedWeekCount={true}
        showNonCurrentDates={true}
        height="auto"
        dateClick={(info: DateClickArg) => onSelectDate(info.dateStr)}
        datesSet={(dateInfo) => {
          // view.currentStart = 실제 표시 중인 기간의 시작(월별 보기면 그 달 1일)
          const current = dateInfo.view.currentStart;
          const year = current.getFullYear();
          const month = String(current.getMonth() + 1).padStart(2, "0");
          onMonthChange(`${year}-${month}`);
        }}
        dayCellContent={(arg) => {
          const dateStr = toLocalDateString(arg.date);
          const hasEvent = eventDates.has(dateStr);

          return (
            <div className="relative flex flex-col items-center gap-1">
              <span className="text-sm">{arg.dayNumberText}</span>
              {hasEvent && (
                <span className="size-5 rounded-full bg-primary-normal" />
              )}
            </div>
          );
        }}
        dayCellClassNames={({ date }) => {
          const dateStr = toLocalDateString(date);
          return dateStr === selectedDate ? "bg-blue-50 rounded-full" : "";
        }}
      />
    </div>
  );
};

interface CalendarDateListProps {
  events: ICalendarEvent[];
  selectedDate: string;
  currentMonth: string;
}

const CalendarDateList = ({ events, currentMonth }: CalendarDateListProps) => {
  const filteredEvents = events.filter((event) =>
    event.date.startsWith(currentMonth),
  );

  // 🔥 이벤트가 없을 때만 빈 UI 표시
  if (filteredEvents.length === 0) {
    return (
      <>
        <h3 className="mb-4 text-lg font-semibold">{currentMonth} 일정</h3>
        <div className="flex h-full items-center justify-center text-sm text-gray-400">
          일정이 없습니다
        </div>
      </>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">{currentMonth} 일정</h3>
      <ul className="divide-y">
        {filteredEvents.map((event) => (
          <li key={event.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-gray-900">{event.title}</p>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                <span>{event.date}</span>
                <span>{event.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  events: ICalendarEvent[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const BottomSheet = ({
  isOpen,
  onClose,
  selectedDate,
  events,
}: BottomSheetProps) => {
  // 선택된 날짜의 이벤트 필터링
  const dayEvents = events.filter((event) => event.date === selectedDate);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-white"
          >
            {/* 핸들 바 */}
            <div className="sticky top-0 z-10 bg-white pb-2 pt-3">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            {/* 내용 */}
            <div className="overflow-y-auto px-6 pb-6">
              {/* 날짜 헤더 */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {formatDate(selectedDate)}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {dayEvents.length > 0
                    ? `${dayEvents.length}개의 일정`
                    : "일정이 없습니다"}
                </p>
              </div>

              {/* 이벤트 리스트 */}
              {dayEvents.length > 0 ? (
                <div className="space-y-3">
                  {dayEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50/50 p-4 transition-all hover:border-blue-200 hover:shadow-md"
                    >
                      {/* 왼쪽 컬러 바 */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />

                      <div className="pl-3">
                        <p className="font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                          {event.title}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            🕐 {event.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <div className="text-6xl opacity-20">📅</div>
                  <p className="text-sm text-gray-400">
                    이 날짜에 등록된 일정이 없습니다
                  </p>
                </div>
              )}

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="mt-6 w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// 🔥 드래그로 닫을 수 있는 Bottom Sheet
const DraggableBottomSheet = ({
  isOpen,
  onClose,
  selectedDate,
  events,
}: BottomSheetProps) => {
  const dayEvents = events.filter((event) => event.date === selectedDate);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              // 100px 이상 아래로 드래그하면 닫기
              if (info.offset.y > 100) {
                onClose();
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-white"
          >
            {/* 핸들 바 - 드래그 가능 */}
            <div className="sticky top-0 z-10 cursor-grab bg-white pb-2 pt-3 active:cursor-grabbing">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            {/* 내용 - 스크롤 가능 */}
            <div className="overflow-y-auto px-6 pb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {formatDate(selectedDate)}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {dayEvents.length > 0
                    ? `${dayEvents.length}개의 일정`
                    : "일정이 없습니다"}
                </p>
              </div>

              {dayEvents.length > 0 ? (
                <div className="space-y-3">
                  {dayEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50/50 p-4 transition-all hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
                      <div className="pl-3">
                        <p className="font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                          {event.title}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            🕐 {event.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <div className="text-6xl opacity-20">📅</div>
                  <p className="text-sm text-gray-400">
                    이 날짜에 등록된 일정이 없습니다
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="mt-6 w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CalendarInfo = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 🔥 날짜 클릭 핸들러
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsBottomSheetOpen(true);
  };

  // 🔥 Bottom Sheet 닫기 핸들러
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-center pb-20">
        <div className="rounded-2xl bg-white p-6 lg:grid lg:grid-cols-[1fr_minmax(auto,400px)] lg:gap-6">
          <div className={styles.root}>
            <Calendar
              events={EVENTS}
              selectedDate={selectedDate}
              onSelectDate={handleDateClick}
              onMonthChange={setCurrentMonth}
            />
          </div>
          <CalendarDateList
            events={EVENTS}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
          />
        </div>
      </div>
      {/* 🔥 Bottom Sheet */}
      {/* <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        selectedDate={selectedDate}
        events={EVENTS}
      /> */}
      <DraggableBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        selectedDate={selectedDate}
        events={EVENTS}
      />
    </>
  );
};

export default CalendarInfo;
