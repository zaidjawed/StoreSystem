import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import BillView from "../../../utils/BillView";
import { printBill } from "../../../utils/functions";
import EditableBill from "./EditableBill";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import ProductsView from "../../../utils/ProductsView";

const endReservation = async (id: string) => {
  await axios.get(import.meta.env.VITE_SERVER_URL + "/end-reservation", {
    params: { bill_id: id },
  });
};

const Bill = ({ context, item: bill, ...props }: any) => {
  const { setMsg, printer, setPrinter, getBills } = context;
  const [billPreviewOpen, setBillPreviewOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const billRef = useRef<HTMLDivElement>(null);

  const { mutate: endReservationMutation } = useMutation({
    mutationKey: ["endReservation"],
    mutationFn: endReservation,
    onSuccess: () => {
      setMsg({ type: "success", text: "Reservation delivered" });
      getBills();
    },
    onError: () => {
      setMsg({ type: "error", text: "An error occurred while delivering the reservation" });
    },
  });

  const printWithPrinter = useCallback(async () => {
    setBillPreviewOpen(true);
    if (printer) {
      setTimeout(() => {
        printBill(billRef, setMsg, setBillPreviewOpen, printer);
      }, 500);
    } else {
      // request access to usb device, no filter listing all devices
      // @ts-ignore
      const usbDevice = await navigator.usb.requestDevice({
        filters: [
          {
            vendorId: 2727,
          },
        ],
      });
      // open the device
      await usbDevice.open();
      await usbDevice.selectConfiguration(1);
      await usbDevice.claimInterface(0);
      setPrinter(usbDevice);
      printBill(billRef, setMsg, setBillPreviewOpen, usbDevice);
    }
  }, [printer]);

  return (
    <>
      <BillView
        bill={bill}
        open={billPreviewOpen}
        setOpen={setBillPreviewOpen}
        ref={billRef}
      />
      {editing ? (
        <EditableBill bill={bill} setEditing={setEditing} getBills={getBills} />
      ) : null}
      {!bill.isExpanded && (
        <TableRow {...props}>
          <TableCell>{bill.id}</TableCell>
          <TableCell>
          Bill{" "}
          {bill.type === "sell"
            ? "Sale"
            : bill.type === "buy"
            ? "Purchase"
            : bill.type === "return"
            ? "Return"
            : bill.type === "BNPL"
            ? "Deferred Sale"
            : bill.type === "reserve"
            ? "Reservation"
            : bill.type === "installment"
            ? "Installment"
            : ""}
          </TableCell>
          <TableCell>{new Date(bill.time).toLocaleString("ar-EG")}</TableCell>
          <TableCell>{Math.abs(bill.discount)}</TableCell>
          <TableCell>{Math.abs(bill.total)}</TableCell>
          <TableCell>
            <ButtonGroup
              variant="outlined"
              sx={{
                width: "100%",
              }}
            >
              <Button onClick={() => setEditing(true)}>Edit</Button>
              <Button onClick={() => setBillPreviewOpen(true)}>Preview</Button>
              <Button onClick={printWithPrinter}>Print</Button>
              {bill.type === "reserve" && (
                <Button onClick={() => endReservationMutation(bill.id)}>
                  Deliver
                </Button>
              )}
            </ButtonGroup>
          </TableCell>
          <TableCell>
            {bill.party_name ? bill.party_name : "No Second Party"}
          </TableCell>
        </TableRow>
      )}
      {bill.isExpanded && (
        <TableRow {...props}>{<ProductsView bill={bill} />}</TableRow>
      )}
    </>
  );
};

export default Bill;
