import React, {useMemo} from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../../constants/colors';

import DefaultHeaderCellComponent from './DefaultHeaderCellComponent';

const HeaderCell = ({fieldWidth, customHeaderComponent, header, fieldFilters, setFilterModalInfo, sortInfo, setSortInfo, selectedHeaderFields, setSelectedHeaderFields}) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={[styles.cellStyle, {width: fieldWidth, backgroundColor: selectedHeaderFields.includes(header.Field) ? theme.primaryAlt : theme.primary}]}>
      {customHeaderComponent ?
        customHeaderComponent(header.Title, header)
        :
        <DefaultHeaderCellComponent 
          title={header.Title} 
          item={header}
          fieldFilters={fieldFilters}
          setFilterModalInfo={setFilterModalInfo}
          sortInfo={sortInfo}
          setSortInfo={setSortInfo}
          selectedHeaderFields={selectedHeaderFields}
          setSelectedHeaderFields={setSelectedHeaderFields}
        />
      }
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  cellStyle: {
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    borderColor: theme.text,
    borderWidth: 1,
    borderLeftWidth: 0,
  },
});

export default HeaderCell;
