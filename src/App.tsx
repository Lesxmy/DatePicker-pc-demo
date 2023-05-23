import React, { useState } from "react";
import { Button, Calendar, DatePicker, Popup } from "antd-mobile";
import dayjs from "dayjs";

export default () => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState("");
  const os = (() => {
    let ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet )/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc
    };
  })();

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        {date || "请选择时间"}
      </Button>

      {os.isPc ? (
        <Popup
          visible={visible}
          onMaskClick={() => {
            setVisible(false);
          }}
        >
          <Calendar
            selectionMode="single"
            allowClear={false}
            defaultValue={date ? new Date(date) : new Date()}
            onChange={(v) => {
              setDate(dayjs(v).format("YYYY-MM-DD"));
              setVisible(false);
            }}
          />
        </Popup>
      ) : (
        <DatePicker
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onConfirm={(v) => {
            setDate(dayjs(v).format("YYYY-MM-DD"));
          }}
          mouseWheel
        />
      )}
    </>
  );
};
