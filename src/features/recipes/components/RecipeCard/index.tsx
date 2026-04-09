import { TouchableOpacity, Image, View } from 'react-native';

import AppIcon from '../../../../components/AppIcon';
import AppText from '../../../../components/AppText';
import { theme } from '../../../../theme';

import styles from './styles';

type TrendingRecipeCardProps = {
  image: string;
  rating: number;
  reviewCount: number;
  title: string;
  duration: number;
  calories: number;
  onPress?: () => void;
};

const RecipeCard = ({
  image,
  rating,
  reviewCount,
  title,
  duration,
  calories,
  onPress,
}: TrendingRecipeCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
    <View style={styles.content}>
      <View style={styles.ratingRow}>
        <AppIcon name="Star" size={14} fill color={theme.colors.primary} />
        <AppText
          variant="label"
          weight="bold"
          size="xs"
          color={theme.colors.darkBrown}
        >
          {rating} ({reviewCount} reviews)
        </AppText>
      </View>
      <AppText
        variant="headline"
        weight="bold"
        size="md"
        color={theme.colors.black}
      >
        {title}
      </AppText>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <AppIcon name="Clock" size={13} color={theme.colors.darkBrown} />
          <AppText
            variant="label"
            weight="semiBold"
            size="xs"
            color={theme.colors.darkBrown}
          >
            {duration} min
          </AppText>
        </View>
        <View style={styles.metaItem}>
          <AppIcon
            name="Utensils"
            size={13}
            fill
            color={theme.colors.darkBrown}
          />
          <AppText
            variant="label"
            weight="semiBold"
            size="xs"
            color={theme.colors.darkBrown}
          >
            {calories} kcal
          </AppText>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default RecipeCard;
