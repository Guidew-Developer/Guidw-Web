import type { TFunction } from "i18next";

const guidewMessageKeyMap: Record<string, string> = {
  "Order not found": "guidew.messages.orderNotFound",
  "Order already cancelled": "guidew.messages.orderAlreadyCancelled",
  "Traveler missing": "guidew.messages.travelerMissing",
  "Participants missing": "guidew.messages.participantsMissing",
  "Provider profile missing": "guidew.messages.providerProfileMissing",
  "Provider account missing": "guidew.messages.providerAccountMissing",
  "Mutual cancellation within 3 hours": "guidew.messages.mutualCancellation",
  "Cancelled more than 3 hours in advance": "guidew.messages.cancelledMoreThan3Hours",
  "Cancelled 1-3 hours before start": "guidew.messages.cancelledOneToThreeHours",
  "Cancelled less than 1 hour before start": "guidew.messages.cancelledLessThanOneHour",
  "Cancelled after service start": "guidew.messages.cancelledAfterStart",
  "Provider marked as no-show. Full refund issued.": "guidew.messages.providerNoShow",
  "Traveler marked as no-show. Provider compensated.": "guidew.messages.travelerNoShow"
};

export const translateGuidewMessage = (message: string, t: TFunction) => {
  const key = guidewMessageKeyMap[message];
  if (!key) {
    return message;
  }
  return t(key, { defaultValue: message });
};
