import React from "react";
import { observer } from "mobx-react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { SettingsCheckbox } from "types/filter";
import { useStore } from "stores";

type Props = {
  setting: "settingAuth" | "settingCors" | "selectedCategory";
};
const ListCheckBox: React.FC<Props> = ({ setting }) => {
  const {
    filterStore: { settingAuth, settingCors, settingCategories, changeFilter },
  } = useStore();

  let settingStore: SettingsCheckbox = {};
  if (setting === "settingAuth") settingStore = settingAuth;
  if (setting === "settingCors") settingStore = settingCors;
  if (setting === "selectedCategory") settingStore = settingCategories;
  return (
    <>
      {Object.keys(settingStore).map((s) => (
        <FormControlLabel
          key={s}
          control={
            <Checkbox
              checked={settingStore.s}
              onChange={changeFilter}
              name={s}
              color="primary"
              inputProps={{ "data-setting": setting } as any}
            />
          }
          label={s}
        />
      ))}
    </>
  );
};

export default observer(ListCheckBox);
